package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.models.PasswordResetToken;
import com.academy.edge.studentmanager.models.User;
import com.academy.edge.studentmanager.repositories.PasswordResetTokenRepository;
import com.academy.edge.studentmanager.services.PasswordResetTokenService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetTokenServiceImpl implements PasswordResetTokenService {
    private final PasswordResetTokenRepository tokenRepository;

    @Override
    @Transactional
    public String createPasswordResetTokenForUser(User user) {
        String tokenValue = UUID.randomUUID().toString();

        PasswordResetToken existingToken = tokenRepository.findByUser(user).orElse(null);

        if (existingToken != null) {
            tokenRepository.delete(existingToken);
            tokenRepository.flush();
        }

        PasswordResetToken passwordResetToken = new PasswordResetToken(tokenValue, user);

        tokenRepository.save(passwordResetToken);
        return tokenValue;

    }

    @Override
    @Transactional
    public void validatePasswordResetToken(String token) throws RuntimeException {
        Optional<PasswordResetToken> passTokenOpt = tokenRepository.findByToken(token);
        if (passTokenOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
        PasswordResetToken passToken = passTokenOpt.get();
        if (passToken.isExpired()) {
            tokenRepository.delete(passToken);

            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Expired token");
        }
    }

    @Override
    public User getUserByPasswordResetToken(String token) throws RuntimeException {
        Optional<PasswordResetToken> passTokenOpt = tokenRepository.findByToken(token);
        if (passTokenOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
        PasswordResetToken passToken = passTokenOpt.get();
        User user = passToken.getUser();
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found for the provided token");
        }
        return user;
    }

    @Override
    @Transactional
    public void deletePasswordResetToken(String token) throws RuntimeException {
        Optional<PasswordResetToken> passTokenOpt = tokenRepository.findByToken(token);
        if (passTokenOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
        PasswordResetToken passToken = passTokenOpt.get();
        tokenRepository.delete(passToken);
    }

}
