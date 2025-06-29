package com.academy.edge.studentmanager.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentTerminateDTO {
    @NotBlank(message = "Justificativa é obrigatória")
    private String terminationReason;
}
