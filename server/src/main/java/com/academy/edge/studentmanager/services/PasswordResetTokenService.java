package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.models.User;
import org.springframework.stereotype.Service;

@Service
public interface PasswordResetTokenService {
    String createPasswordResetTokenForUser(User user);
    void validatePasswordResetToken(String token) throws RuntimeException;
    User getUserByPasswordResetToken(String token) throws RuntimeException;
    void deletePasswordResetToken(String token) throws RuntimeException;
}