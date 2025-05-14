package com.academy.edge.studentmanager.dtos;

import com.academy.edge.studentmanager.enums.InstructorSpecialization;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class InstructorResponseDTO {
    private String id;
    private String name;
    private String about;
    private String photoUrl;
    private String linkedIn;
    private InstructorSpecialization specialization;
}
