package com.academy.edge.studentmanager.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignInRequestDTO {
    @Email
    private String email;

    @Size(min = 8, max = 20)
    private String password;
}
