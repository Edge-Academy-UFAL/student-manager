package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.InvitationResponseDTO;
import com.academy.edge.studentmanager.models.Invitation;

import java.util.List;

public interface InvitationService {
    InvitationResponseDTO sendInvitation(List<String> emails, int studentGroup, String entryDate);

    Invitation isInvitationValid(String invitationId, String email);

    void deleteInvitation(String invitationId, String email);
}
