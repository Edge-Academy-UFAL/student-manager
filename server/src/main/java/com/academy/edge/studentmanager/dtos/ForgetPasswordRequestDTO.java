package com.academy.edge.studentmanager.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ForgetPasswordRequestDTO {
    @NotBlank(message = "O email é obrigatório")
    private String email;
}
