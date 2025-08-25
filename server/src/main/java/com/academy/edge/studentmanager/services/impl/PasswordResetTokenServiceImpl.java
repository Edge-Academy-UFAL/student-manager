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

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetTokenServiceImpl implements PasswordResetTokenService {
    private final PasswordResetTokenRepository tokenRepository;

    @Override
    @Transactional
    public String createPasswordResetTokenForUser(User user) {
        tokenRepository.deleteAllByUser(user);
        tokenRepository.flush();

        var tokenValue = UUID.randomUUID().toString();
        var passwordResetToken = new PasswordResetToken(tokenValue, user);
        tokenRepository.save(passwordResetToken);

        return tokenValue;
    }

    @Override
    @Transactional
    public PasswordResetToken getValidPasswordResetToken(String token) {
        var passToken = tokenRepository.findByToken(token)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token"));

        if (passToken.isExpired()) {
            tokenRepository.delete(passToken);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Expired token");
        }

        var user = passToken.getUser();
        if (user == null) {
            tokenRepository.delete(passToken);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found for the provided token");
        }

        return passToken;
    }

    @Override
    @Transactional
    public void deletePasswordResetToken(PasswordResetToken passToken) {
        tokenRepository.delete(passToken);
    }

}
