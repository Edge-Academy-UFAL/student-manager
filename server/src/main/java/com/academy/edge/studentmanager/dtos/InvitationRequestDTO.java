package com.academy.edge.studentmanager.dtos;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class InvitationRequestDTO {

    @NotNull
    private List<@NotNull @Email String> emails;

    @NotNull
    private int studentGroup;

    @NotBlank
    private String entryDate;
}
