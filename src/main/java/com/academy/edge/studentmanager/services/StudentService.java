package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.StudentCreateDTO;
import com.academy.edge.studentmanager.dtos.StudentResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StudentService {
    List<StudentResponseDTO> getStudents();

    StudentResponseDTO getStudentById(String uuid);

    StudentResponseDTO insertStudent(StudentCreateDTO studentCreateDTO);

    //TODO: update student
    //void updateStudent(String uuid, );

    void deleteStudent(String uuid);
}
