package com.academy.edge.studentmanager.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvitationSendResponseDTO {
    @NotNull
    private List<String> successfulEmails;

    @NotNull
    private Map<String, InvitationErrorDTO> failedEmails;
}
