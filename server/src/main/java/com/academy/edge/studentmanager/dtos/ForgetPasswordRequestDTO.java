package com.academy.edge.studentmanager.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ForgetPasswordRequestDTO {
    @NotBlank(message = "O email é obrigatório")
    private String email;
}
