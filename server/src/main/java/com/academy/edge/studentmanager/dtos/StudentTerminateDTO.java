package com.academy.edge.studentmanager.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentTerminateDTO {
    @NotBlank(message = "Justificativa é obrigatória")
    private String terminationReason;
}
