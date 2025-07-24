package com.academy.edge.studentmanager.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvitationSendResponseDTO {
    private List<String> successfulEmails;
    private Map<String, InvitationErrorDTO> failedEmails;
}
