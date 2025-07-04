package com.academy.edge.studentmanager.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdministratorCreateDTO {

    @NotNull(message = "Nome é obrigatório")
    private String name;

    @NotNull
    @Email(message = "Email inválido")
    private String email;
}
