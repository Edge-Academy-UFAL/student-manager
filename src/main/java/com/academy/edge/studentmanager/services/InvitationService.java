package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.InvitationResponseDTO;

import java.util.List;

public interface InvitationService {
    InvitationResponseDTO sendInvitation(List<String> emails);

    Boolean isInvitationValid(String invitationId, String email);

    void deleteInvitation(String invitationId, String email);
}
