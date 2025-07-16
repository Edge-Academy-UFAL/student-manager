package com.academy.edge.studentmanager.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResetPasswordRequestDTO {
    @NotBlank
    private String token;

    @NotBlank
    @Size(min = 8, max = 20)
    private String password;
}
