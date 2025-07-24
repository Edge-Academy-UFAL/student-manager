package com.academy.edge.studentmanager.dtos;

import com.academy.edge.studentmanager.enums.InvitationErrorType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvitationErrorDTO {
    private InvitationErrorType error;
    private String cause;
}
