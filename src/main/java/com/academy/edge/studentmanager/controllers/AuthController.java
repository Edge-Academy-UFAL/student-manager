package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.JwtAuthResponseDTO;
import com.academy.edge.studentmanager.dtos.SignInRequestDTO;
import com.academy.edge.studentmanager.models.User;
import com.academy.edge.studentmanager.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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

    // TODO: temporary endpoint for getting the current user
    @GetMapping("/me")
    public ResponseEntity<User> me(@AuthenticationPrincipal User user){
        user.setPassword(null);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}