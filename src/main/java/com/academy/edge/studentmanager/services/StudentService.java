package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.StudentCreateDTO;
import com.academy.edge.studentmanager.dtos.StudentResponseDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface StudentService {
    List<StudentResponseDTO> getStudents();

    StudentResponseDTO getStudentByEmail(String email);

    StudentResponseDTO insertStudent(StudentCreateDTO studentCreateDTO, MultipartFile file);

    //TODO: update student
    //void updateStudent(String uuid, );

    void deleteStudent(String email);
}
