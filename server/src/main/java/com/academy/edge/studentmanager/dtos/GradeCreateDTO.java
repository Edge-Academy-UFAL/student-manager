package com.academy.edge.studentmanager.dtos;

import com.academy.edge.studentmanager.enums.SubjectStatus;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GradeCreateDTO {
    @NotBlank
    private String subjectCode;

    @NotBlank
    @Email(message = "Email inválido")
    private String studentEmail;

    @NotNull
    @Min(1)
    @Max(15)
    private int period;

    @Min(value = 0, message = "A nota deve estar entre 0 e 10")
    @Max(value = 10, message = "A nota deve estar entre 0 e 10")
    private Double finalGrade;

    @NotNull
    private SubjectStatus subjectStatus;
}