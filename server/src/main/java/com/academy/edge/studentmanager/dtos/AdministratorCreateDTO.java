package com.academy.edge.studentmanager.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdministratorCreateDTO {

    @NotNull(message = "Nome é obrigatório")
    private String name;

    @NotNull
    @Email(message = "Email inválido")
    private String email;

    @NotNull (message = "Uma descrição é obrigatória")
    private String about;
}
