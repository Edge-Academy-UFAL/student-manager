package com.academy.edge.studentmanager.dtos;

import com.academy.edge.studentmanager.enums.GroupType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class GroupCreateDTO {
    @NotBlank(message = "Nome é obrigatório")
    private String name;

    @Size(max = 250, message = "A descrição deve ter no máximo 300 caracteres")
    private String description;

    @NotNull(message = "Tipo do grupo é obrigatório")
    private GroupType groupType;
}
