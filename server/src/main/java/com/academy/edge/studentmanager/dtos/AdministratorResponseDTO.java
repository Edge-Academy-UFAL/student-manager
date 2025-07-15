package com.academy.edge.studentmanager.dtos;

import com.academy.edge.studentmanager.enums.Course;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdministratorResponseDTO {
    private String id;
    private String name;
    private String email;
    private String about;
    private String photoUrl;
}