package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.*;
import com.academy.edge.studentmanager.models.User;
import com.academy.edge.studentmanager.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponseDTO> signIn(@Valid @RequestBody SignInRequestDTO requestDTO) {
        String jwt = authService.login(requestDTO);
        JwtAuthResponseDTO responseDTO = new JwtAuthResponseDTO();
        responseDTO.setToken(jwt);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    // TODO: temporary endpoint for getting the current user
    @GetMapping("/me")
    public ResponseEntity<User> me(@AuthenticationPrincipal User user) {
        user.setPassword(null);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@Valid @RequestBody ForgotPasswordRequestDTO forgotPasswordRequestDTO) {
        String email = forgotPasswordRequestDTO.getEmail();
        authService.forgotPassword(email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@Valid @RequestBody ResetPasswordRequestDTO resetPasswordRequestDTO) {
        authService.resetPassword(resetPasswordRequestDTO);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/change-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> changePassword(@AuthenticationPrincipal User user, @Valid @RequestBody ChangePasswordRequestDTO changePasswordRequestDTO) {
        authService.validatePassword(user, changePasswordRequestDTO.getOldPassword());
        authService.changePassword(user, changePasswordRequestDTO.getNewPassword());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}