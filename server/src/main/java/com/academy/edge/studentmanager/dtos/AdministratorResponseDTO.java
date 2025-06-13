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
    private String name;
    private String email;


    /////// Informações que tinham no Instructor e não estão no Administrator
    // private String id;
    // private String about;
    // private String photoUrl;
    // private String linkedIn;
    // private String password;
    // private InstructorSpecialization specialization;
}