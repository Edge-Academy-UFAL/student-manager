package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.InvitationSendResponseDTO;
import com.academy.edge.studentmanager.dtos.InvitationRequestDTO;
import com.academy.edge.studentmanager.services.InvitationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/register")
public class InvitationController {
    private final InvitationService invitationService;

    public InvitationController(InvitationService invitationService) {
        this.invitationService = invitationService;
    }

    @GetMapping("/{invitationId}")
    public ResponseEntity<Void> checkInvitation(@PathVariable String invitationId) {
        this.invitationService.getValidInvitation(invitationId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<InvitationSendResponseDTO> inviteStudents(@Valid @RequestBody InvitationRequestDTO requestDTO) {
        var responseDTO = invitationService.sendInvitations(
                requestDTO.getEmails(),
                requestDTO.getStudentGroup(),
                requestDTO.getEntryDate()
        );
        var status = responseDTO.getFailedEmails().isEmpty() ? HttpStatus.OK : HttpStatus.MULTI_STATUS;
        return new ResponseEntity<>(responseDTO, status);
    }
}
