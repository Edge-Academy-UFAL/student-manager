package com.academy.edge.studentmanager.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class InvitationSendResponseDTO {
    private List<String> successfulEmails;
    private Map<String, String> failedEmails;
}
