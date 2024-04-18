package com.academy.edge.studentmanager.dtos;


import com.academy.edge.studentmanager.validators.EmailCollection;
import lombok.Data;

import java.util.List;

@Data
public class InvitationRequestDTO {

    @EmailCollection
    private List<String> emails;

    private int studentGroup;

    private String entryDate;
}
