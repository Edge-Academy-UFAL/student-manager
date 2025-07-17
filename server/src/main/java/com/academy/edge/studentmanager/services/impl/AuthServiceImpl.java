package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.dtos.NewPasswordRequestDTO;
import com.academy.edge.studentmanager.dtos.SignInRequestDTO;
import com.academy.edge.studentmanager.models.User;
import com.academy.edge.studentmanager.repositories.UserRepository;
import com.academy.edge.studentmanager.security.JWTUtil;
import com.academy.edge.studentmanager.services.AuthService;
import com.academy.edge.studentmanager.services.PasswordResetTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o email: " + email));

        return passwordResetTokenService.createPasswordResetTokenForUser(user);
    }

    @Override
    @Transactional
    public void resetPassword(NewPasswordRequestDTO newPasswordRequest) {
        String token = newPasswordRequest.getToken();
        String newPassword = newPasswordRequest.getPassword();
        String confirmPassword = newPasswordRequest.getConfirmPassword();

        try {
            if (!newPassword.equals(confirmPassword)) {
                throw new RuntimeException("As senhas não coincidem");
            }

            passwordResetTokenService.validatePasswordResetToken(token);

            User user = passwordResetTokenService.getUserByPasswordResetToken(token);

            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);

            passwordResetTokenService.deletePasswordResetToken(token);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}