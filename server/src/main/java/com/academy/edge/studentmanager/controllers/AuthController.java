package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.ForgetPasswordRequestDTO;
import com.academy.edge.studentmanager.dtos.JwtAuthResponseDTO;
import com.academy.edge.studentmanager.dtos.NewPasswordRequestDTO;
import com.academy.edge.studentmanager.dtos.SignInRequestDTO;
import com.academy.edge.studentmanager.models.User;
import com.academy.edge.studentmanager.services.AuthService;
import com.academy.edge.studentmanager.services.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final EmailService emailService;

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
    public ResponseEntity<String> forgotPassword(@Valid @RequestBody ForgetPasswordRequestDTO forgetPasswordRequestDTO) {
        String email = forgetPasswordRequestDTO.getEmail();
        log.info("Password reset request for email: {}", email);

        String token = authService.forgotPassword(email);
        if (token == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with email: " + email);
        }
        try {
            emailService.sendPasswordResetEmail(email, token);
        } catch (Exception e) {
            log.error("Error sending password reset email", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send password reset email");
        }
        return ResponseEntity.ok("Password reset link sent to " + email + ". Token: " + token);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> handlePasswordReset(@Valid @RequestBody NewPasswordRequestDTO newPasswordRequestDTO
    ) {
        authService.resetPassword(newPasswordRequestDTO);

        return ResponseEntity.ok("Password reset successfully");
    }
}