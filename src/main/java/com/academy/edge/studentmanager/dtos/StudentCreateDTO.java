package com.academy.edge.studentmanager.dtos;

import com.academy.edge.studentmanager.enums.Course;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor()
public class StudentCreateDTO {
    @NotBlank(message = "Nome é obrigatório")
    private String name;

    @Email(message = "Email inválido")
    private String email;

    @Size(min = 8, max = 20, message = "A senha deve estar entre 8 e 20 caracteres")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$",
            message = "A senha deve conter ao menos uma letra minúscula, uma maiúscula e um digito")
    private String password;

    @NotNull(message = "Curso é obrigatório")
    private Course course;

    @Pattern(regexp = "\\d+", message="Informe uma matricula válida")
    @Size(min = 10, max = 10, message = "Informe uma matrícula válida")
    private String registration;

    @Max(12)
    @Min(1)
    private int period;

    @NotBlank(message = "Código de ativação é obrigatório")
    private String activationCode;
}
