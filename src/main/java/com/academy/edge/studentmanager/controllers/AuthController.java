package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.JwtAuthResponseDTO;
import com.academy.edge.studentmanager.dtos.SignInRequestDTO;
import com.academy.edge.studentmanager.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    final AuthService authService;
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponseDTO> signIn(@Valid @RequestBody SignInRequestDTO requestDTO){
        String jwt = authService.login(requestDTO);
        JwtAuthResponseDTO responseDTO = new JwtAuthResponseDTO();
        responseDTO.setToken(jwt);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
}