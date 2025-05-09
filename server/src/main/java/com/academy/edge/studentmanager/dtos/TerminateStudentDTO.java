package com.academy.edge.studentmanager.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TerminateStudentDTO {
    @NotBlank(message = "Justificativa é obrigatória")
    private String terminationReason;
}
