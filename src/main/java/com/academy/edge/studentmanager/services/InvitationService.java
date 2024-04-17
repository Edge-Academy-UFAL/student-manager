package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.InvitationResponseDTO;

import java.util.List;

public interface InvitationService {
    InvitationResponseDTO sendInvitation(List<String> emails, int studentGroup, String entryDate);

    Boolean isInvitationValid(String invitationId, String email);

    void deleteInvitation(String invitationId, String email);
}
