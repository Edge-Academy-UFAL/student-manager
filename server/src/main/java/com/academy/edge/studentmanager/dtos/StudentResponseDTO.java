package com.academy.edge.studentmanager.dtos;

import com.academy.edge.studentmanager.enums.Course;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class StudentResponseDTO {
    @NotBlank
    private String id;

    @NotBlank
    private String name;

    // Can be null
    private String photoUrl;

    // Can be null
    private String academicRecordUrl;

    // Can be null
    private String about;

    // Can be null
    private LocalDate birthDate;

    // Can be null
    private Course course;

    // Can be null
    private String registration;

    // Can be null
    private String phone;

    // Can be null
    private String secondaryPhone;

    // Can be null
    private int period;

    // Can be null
    private String entryPeriod;

    @NotBlank
    private String dtype;

    @NotBlank
    private String email;

    @NotBlank
    private LocalDate entryDate;

    @NotBlank
    private int studentGroup;

    @NotBlank
    private double ira;
}
