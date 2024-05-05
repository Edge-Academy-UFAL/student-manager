package com.academy.edge.studentmanager.dtos;

import com.academy.edge.studentmanager.enums.Course;
import com.academy.edge.studentmanager.validators.ValidBirthdate;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor()
public class StudentUpdateDTO {
    @NotBlank(message = "Nome é obrigatório")
    private String name;

    @NotNull(message = "Insira uma data de nascimento")
    @ValidBirthdate(message = "Informe uma data de nascimento válida")
    private String birthDate;

    @NotNull(message = "Curso é obrigatório")
    private Course course;

    @NotBlank(message = "Insira um número de matrícula")
    @Pattern(regexp = "\\d+", message = "Informe uma matricula válida")
    @Size(min = 8, max = 8, message = "Informe uma matrícula válida")
    private String registration;

    @NotBlank(message = "Insira um número de telefone")
    @Pattern(regexp = "\\d{2}9\\d{8}", message = "Informe um número de telefone válido")
    private String phone;

    @Pattern(regexp = "(\\d{2}9\\d{8})|($)", message = "Informe um número de telefone secundário válido")
    private String secondaryPhone;

    @NotNull(message = "Insira o periodo")
    @Max(10)
    @Min(1)
    private int period;

    @NotBlank(message = "Insira o periodo de entrada no curso")
    @Pattern(regexp = "\\d{4}\\.[1-2]", message = "Informe um periodo válido")
    private String entryPeriod;

    private String aboutMe;
}
