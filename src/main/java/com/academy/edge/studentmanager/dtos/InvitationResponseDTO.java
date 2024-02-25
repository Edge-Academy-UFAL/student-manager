package com.academy.edge.studentmanager.dtos;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class InvitationResponseDTO {
    private List<String> successfulEmails= new ArrayList<>();
    private List<String> failedEmails = new ArrayList<>();
}
