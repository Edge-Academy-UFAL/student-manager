package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.InvitationRequestDTO;
import com.academy.edge.studentmanager.dtos.InvitationResponseDTO;
import com.academy.edge.studentmanager.services.InvitationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/register")
public class InvitationController {

    private final InvitationService invitationService;

    @Autowired
    public InvitationController(InvitationService invitationService) {
        this.invitationService = invitationService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'INSTRUCTOR')")
    public ResponseEntity<InvitationResponseDTO> register(@Valid @RequestBody InvitationRequestDTO invitationRequestDTO) {
        return new ResponseEntity<>(invitationService.sendInvitation(invitationRequestDTO.getEmails(),
                                                                        invitationRequestDTO.getStudentGroup(),
                                                                        invitationRequestDTO.getEntryDate()),
                                                                        HttpStatus.MULTI_STATUS);
    }
}
