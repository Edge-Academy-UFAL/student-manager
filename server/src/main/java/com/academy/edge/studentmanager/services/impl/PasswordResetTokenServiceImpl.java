package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.models.PasswordResetToken;
import com.academy.edge.studentmanager.models.User;
import com.academy.edge.studentmanager.repositories.PasswordResetTokenRepository;
import com.academy.edge.studentmanager.services.PasswordResetTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;
@Service
@Transactional
public class PasswordResetTokenServiceImpl implements PasswordResetTokenService {
    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    public String createPasswordResetTokenForUser(User user) {
        String tokenValue = UUID.randomUUID().toString();

        try {
            PasswordResetToken existingToken = tokenRepository.findByUser(user).orElse(null);

            if (existingToken != null) {
                tokenRepository.delete(existingToken);
                tokenRepository.flush();
            }

            PasswordResetToken passwordResetToken = new PasswordResetToken(tokenValue, user);

            tokenRepository.save(passwordResetToken);
            return tokenValue;
        } catch (Exception e) {
            throw new RuntimeException("Error creating password reset token", e);
        }

    }

    public void validatePasswordResetToken(String token) throws RuntimeException {
        try {
            Optional<PasswordResetToken> passTokenOpt = tokenRepository.findByToken(token);
            if (passTokenOpt.isEmpty()) {
                throw new RuntimeException("Invalid token");
            }
            PasswordResetToken passToken = passTokenOpt.get();
            if (passToken.isExpired()) {
                tokenRepository.delete(passToken);

                throw new RuntimeException("Expired token");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error validating password reset token", e);
        }
    }

    public User getUserByPasswordResetToken(String token) throws RuntimeException {
        try {
            Optional<PasswordResetToken> passTokenOpt = tokenRepository.findByToken(token);
            if (passTokenOpt.isEmpty()) {
                throw new RuntimeException("Invalid token");
            }
            PasswordResetToken passToken = passTokenOpt.get();
            User user = passToken.getUser();
            if (user == null) {
                throw new RuntimeException("User not found for the provided token");
            }
            return user;
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving user by password reset token", e);
        }
    }

    public void deletePasswordResetToken(String token) throws RuntimeException {
        try {
            Optional<PasswordResetToken> passTokenOpt = tokenRepository.findByToken(token);
            if (passTokenOpt.isEmpty()) {
                throw new RuntimeException("Invalid token");
            }
            PasswordResetToken passToken = passTokenOpt.get();
            tokenRepository.delete(passToken);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting password reset token", e);
        }
    }

}
