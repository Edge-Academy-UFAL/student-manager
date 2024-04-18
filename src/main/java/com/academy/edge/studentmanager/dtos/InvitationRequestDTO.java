package com.academy.edge.studentmanager.dtos;


import com.academy.edge.studentmanager.validators.EmailCollection;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class InvitationRequestDTO {

    @EmailCollection
    private List<String> emails;

    @NotNull
    private int studentGroup;

    @NotBlank
    private String entryDate;
}
