package com.academy.edge.studentmanager.dtos;


import com.academy.edge.studentmanager.validators.EmailCollection;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class InvitationRequestDTO {

    @EmailCollection
    private List<String> emails;

    private int studentGroup = 1;

    private String entryDate = LocalDate.now().toString().substring(0, 8) + "01";
}
