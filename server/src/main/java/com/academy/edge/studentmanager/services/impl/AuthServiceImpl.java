package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.dtos.ResetPasswordRequestDTO;
import com.academy.edge.studentmanager.dtos.SignInRequestDTO;
import com.academy.edge.studentmanager.models.User;
import com.academy.edge.studentmanager.repositories.UserRepository;
import com.academy.edge.studentmanager.security.JWTUtil;
import com.academy.edge.studentmanager.services.AuthService;
import com.academy.edge.studentmanager.services.PasswordResetTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final PasswordResetTokenService passwordResetTokenService;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userService;
    private final JWTUtil jwtUtil;

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
    public String forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return passwordResetTokenService.createPasswordResetTokenForUser(user);
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
}