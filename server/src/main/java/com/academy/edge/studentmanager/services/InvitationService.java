package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.InvitationSendResponseDTO;
import com.academy.edge.studentmanager.models.Invitation;

import java.time.LocalDate;
import java.util.List;

public interface InvitationService {
    InvitationSendResponseDTO sendInvitations(List<String> emails, int studentGroup, LocalDate entryDate);

    Invitation getValidInvitation(String invitationId);

    void deleteInvitation(Invitation invitation);
}
