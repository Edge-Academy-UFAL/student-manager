package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.InvitationGetResponseDTO;
import com.academy.edge.studentmanager.dtos.InvitationSendResponseDTO;
import com.academy.edge.studentmanager.dtos.InvitationRequestDTO;
import com.academy.edge.studentmanager.services.InvitationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    public InvitationController(InvitationService invitationService) {
        this.invitationService = invitationService;
    }

    @GetMapping("/{invitationId}")
    public ResponseEntity<InvitationGetResponseDTO> checkInvitation(@PathVariable String invitationId) {
        var invitation = this.invitationService.getValidInvitation(invitationId);
        var responseDTO = new InvitationGetResponseDTO();
        responseDTO.setEmail(invitation.getEmail());
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'INSTRUCTOR')")
    public ResponseEntity<InvitationSendResponseDTO> register(@Valid @RequestBody InvitationRequestDTO requestDTO) {
        var responseDTO = invitationService.sendInvitations(
                requestDTO.getEmails(),
                requestDTO.getStudentGroup(),
                requestDTO.getEntryDate()
        );
        var status = responseDTO.getFailedEmails().isEmpty() ? HttpStatus.OK : HttpStatus.MULTI_STATUS;
        return new ResponseEntity<>(responseDTO, status);
    }
}
