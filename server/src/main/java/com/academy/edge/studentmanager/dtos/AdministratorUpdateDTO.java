package com.academy.edge.studentmanager.dtos;

import com.academy.edge.studentmanager.models.User;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class AdministratorUpdateDTO {
    @NotBlank(message = "Nome é obrigatório")
    private String name;

    @Size(max = User.MAX_ABOUT_LENGTH)
    private String about;
}
