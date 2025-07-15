package com.academy.edge.studentmanager.dtos;

import com.academy.edge.studentmanager.models.User;
import com.academy.edge.studentmanager.models.Administrator;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor()
public class AdministratorUpdateDTO {
    @NotBlank(message = "Nome é obrigatório")
    private String name;

    @Size(max = User.MAX_ABOUT_LENGTH)
    private String about;
}
