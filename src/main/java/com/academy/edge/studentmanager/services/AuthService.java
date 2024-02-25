package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.SignInRequestDTO;

public interface AuthService {
    String login(SignInRequestDTO signInRequestDTO);
}
