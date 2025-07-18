package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.dtos.ResetPasswordRequestDTO;
import com.academy.edge.studentmanager.dtos.SignInRequestDTO;
import com.academy.edge.studentmanager.models.User;
import com.academy.edge.studentmanager.repositories.UserRepository;
import com.academy.edge.studentmanager.security.JWTUtil;
import com.academy.edge.studentmanager.services.AuthService;
import com.academy.edge.studentmanager.services.EmailService;
import com.academy.edge.studentmanager.services.PasswordResetTokenService;
import jakarta.mail.MessagingException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Map;

@Log4j2
@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordResetTokenService passwordResetTokenService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userService;
    private final JWTUtil jwtUtil;
    private final EmailService emailService;
    private final Resource resetPasswordEmail;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordResetTokenService passwordResetTokenService,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            UserDetailsService userService,
            JWTUtil jwtUtil,
            EmailService emailService,
            @Value("classpath:emails/forgot-password.html") Resource resetPasswordEmail
    ) {
        this.userRepository = userRepository;
        this.passwordResetTokenService = passwordResetTokenService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
        this.resetPasswordEmail = resetPasswordEmail;
    }

    @Override
    public String login(SignInRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails user = userService.loadUserByUsername(request.getEmail());

        return jwtUtil.generateToken(user);
    }

    @Override
    @Transactional
    public void forgotPassword(String email) {
        log.info("Password reset request for email: {}", email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        var token = passwordResetTokenService.createPasswordResetTokenForUser(user);

        try {
            this.sendResetPasswordEmail(email, token);
        } catch (Exception e) {
            log.error("Error sending password reset email", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to send password reset email");
        }
    }

    @Override
    @Transactional
    public void resetPassword(ResetPasswordRequestDTO resetPasswordRequestDTO) {
        String token = resetPasswordRequestDTO.getToken();
        String newPassword = resetPasswordRequestDTO.getPassword();

        var passToken = passwordResetTokenService.getValidPasswordResetToken(token);

        this.changePassword(passToken.getUser(), newPassword);

        passwordResetTokenService.deletePasswordResetToken(passToken);
    }

    @Override
    public void validatePassword(User user, String oldPassword) {
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Invalid password");
        }
    }

    @Override
    @Transactional
    public void changePassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    private void sendResetPasswordEmail(String email, String token) throws MessagingException, IOException {
        var replacements = Map.of("{{LINK_REDEFINICAO}}", token);
        emailService.sendEmailFromTemplate(email, "Redefinição de Senha - Academy", resetPasswordEmail, replacements);
    }
}