package com.academy.edge.studentmanager.dtos;

import com.academy.edge.studentmanager.enums.Course;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StudentResponseDTO {
    private String id;
    private String name;
    private String about;
    private String photoUrl;
    private String linkedIn;
    private Course course;
    private String period;
}