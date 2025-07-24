package com.academy.edge.studentmanager.dtos;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentCreateDTO {
    @NotBlank(message = "Insira uma senha")
    @Size(min = 8, max = 20, message = "A senha deve estar entre 8 e 20 caracteres")
    private String password;

    @NotBlank(message = "Código de ativação é obrigatório")
    private String activationCode;
}
