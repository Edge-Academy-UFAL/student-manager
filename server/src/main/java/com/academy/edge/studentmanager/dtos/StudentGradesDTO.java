package com.academy.edge.studentmanager.dtos;

import com.academy.edge.studentmanager.enums.SubjectStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentGradesDTO {
    private String subjectCode;
    private SubjectStatus subjectStatus;
    private String studentId;
    private Integer period;
    private Double finalGrade;
    private String name;
    private String workload;

    public StudentGradesDTO() {

    }
}
