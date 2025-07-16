package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.ResetPasswordRequestDTO;
import com.academy.edge.studentmanager.dtos.SignInRequestDTO;
import com.academy.edge.studentmanager.models.User;

public interface AuthService {
    String login(SignInRequestDTO signInRequestDTO);
    String forgotPassword(String email);
    void resetPassword(ResetPasswordRequestDTO resetPasswordRequestDTO);
    void changePassword(User user, String newPassword);
}
