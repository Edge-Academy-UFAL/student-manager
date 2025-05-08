package com.academy.edge.studentmanager.dtos;

import com.academy.edge.studentmanager.enums.SubjectStatus;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class GradeUpdateDTO {
    @NotNull
    private SubjectStatus subjectStatus;
    @NotNull
    private double finalGrade;
    @NotBlank
    private String subjectId;
    @NotNull
    private int period;
    @NotBlank
    @Email(message = "Email inválido")
    private String studentEmail;
}
