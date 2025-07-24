package com.academy.edge.studentmanager.dtos;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvitationRequestDTO {

    @NotNull
    private List<@NotNull @Email String> emails;

    @NotNull
    private int studentGroup;

    @NotNull
    private LocalDate entryDate;
}
