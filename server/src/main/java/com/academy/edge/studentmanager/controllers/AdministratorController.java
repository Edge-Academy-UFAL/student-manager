package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.AdministratorCreateDTO;
import com.academy.edge.studentmanager.dtos.InvitationErrorDTO;
import com.academy.edge.studentmanager.enums.InvitationErrorType;
import com.academy.edge.studentmanager.services.AdministratorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@PreAuthorize("isAuthenticated()")
@RestController
@RequestMapping("/api/v1/administrators")
public class AdministratorController {

    private final AdministratorService administratorService;

    @Autowired
    public AdministratorController(AdministratorService administratorService) {
        this.administratorService = administratorService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InvitationErrorDTO> register(@Valid @RequestBody AdministratorCreateDTO requestDTO) {
        var responseDTO = this.administratorService.register(requestDTO.getName(), requestDTO.getEmail());
        HttpStatus status;
        if (responseDTO == null) {
            status = HttpStatus.CREATED;
        } else if (responseDTO.getError() == InvitationErrorType.ALREADY_REGISTERED) {
            status = HttpStatus.CONFLICT;
        } else {
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(responseDTO, status);
    }
}
