package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.models.PasswordResetToken;
import com.academy.edge.studentmanager.models.User;
import org.springframework.stereotype.Service;

@Service
public interface PasswordResetTokenService {
    String createPasswordResetTokenForUser(User user);
    PasswordResetToken getValidPasswordResetToken(String token);
    void deletePasswordResetToken(PasswordResetToken passToken);
}