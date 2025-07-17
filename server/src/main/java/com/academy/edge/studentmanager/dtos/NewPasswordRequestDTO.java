package com.academy.edge.studentmanager.dtos;

import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NewPasswordRequestDTO {
    private String token;

    @Size(min = 8, max = 20)
    private String password;

    @Size(min = 8, max = 20)
    private String confirmPassword;
}
