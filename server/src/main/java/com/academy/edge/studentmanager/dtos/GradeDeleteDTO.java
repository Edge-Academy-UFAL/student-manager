package com.academy.edge.studentmanager.dtos;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GradeDeleteDTO {
    @NotBlank
    private String subjectCode;

    @NotBlank
    @Email(message = "Email inválido")
    private String studentEmail;

    @NotNull
    @Min(1)
    @Max(15)
    private Integer period;
}
