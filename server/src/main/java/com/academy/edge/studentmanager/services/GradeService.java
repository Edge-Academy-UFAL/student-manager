package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.GradeResponseDTO;
import com.academy.edge.studentmanager.dtos.GradeUpdateDTO;
import com.academy.edge.studentmanager.dtos.GradeCreateDTO;
import com.academy.edge.studentmanager.dtos.GradeDeleteDTO;
import com.academy.edge.studentmanager.dtos.StudentGradesDTO;
import java.util.List;


public interface GradeService {


    GradeResponseDTO updateGrade(GradeUpdateDTO gradeUpdateDTO);
    GradeResponseDTO saveGrade(GradeCreateDTO gradeCreateDTO);

    List<StudentGradesDTO> getStudentGrades(String studentId);
  
    void deleteGrade(GradeDeleteDTO gradeDeleteDTO);

    List<Double> getStudentIRAPerPeriod(String email);

    List<Double> getStudentGradesAveragePerPeriod(String email);
}
