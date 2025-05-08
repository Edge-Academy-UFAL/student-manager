package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.StudentCreateDTO;
import com.academy.edge.studentmanager.dtos.StudentResponseDTO;
import com.academy.edge.studentmanager.dtos.StudentUpdateDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface StudentService {
    List<StudentResponseDTO> getStudents();

    StudentResponseDTO getStudentByEmail(String email);

    StudentResponseDTO insertStudent(StudentCreateDTO studentCreateDTO, MultipartFile file);

    StudentResponseDTO updateStudent(String email, StudentUpdateDTO studentUpdateDTO);

    StudentResponseDTO updateStudentPhoto(String email, MultipartFile file);

    void deleteStudent(String email);

    StudentResponseDTO updateStudentAcademicRecord(String email, MultipartFile file);
}
