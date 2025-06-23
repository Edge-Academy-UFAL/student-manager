package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.NewPasswordRequestDTO;
import com.academy.edge.studentmanager.dtos.SignInRequestDTO;

public interface AuthService {
    String login(SignInRequestDTO signInRequestDTO);
    String forgotPassword(String email);
    void resetPassword(NewPasswordRequestDTO newPasswordRequest);
}
