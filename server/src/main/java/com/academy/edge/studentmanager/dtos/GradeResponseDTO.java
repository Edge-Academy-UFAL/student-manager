package com.academy.edge.studentmanager.dtos;

import com.academy.edge.studentmanager.enums.SubjectStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GradeResponseDTO {
  
    private SubjectStatus subjectStatus;
    private double finalGrade;
    private String subjectCode;
    private int period;
    private String studentId;

}
