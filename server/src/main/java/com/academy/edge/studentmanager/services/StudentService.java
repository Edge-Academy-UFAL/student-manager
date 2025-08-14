package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.StudentCreateDTO;
import com.academy.edge.studentmanager.dtos.StudentResponseDTO;
import com.academy.edge.studentmanager.dtos.StudentUpdateDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
public interface StudentService {
    List<StudentResponseDTO> getStudents();

    StudentResponseDTO getStudentByEmail(String email);

    StudentResponseDTO insertStudent(StudentCreateDTO studentCreateDTO, MultipartFile file);

    StudentResponseDTO updateStudent(String email, StudentUpdateDTO studentUpdateDTO);

    StudentResponseDTO updateStudentPhoto(String email, MultipartFile file);

    void deleteStudent(String email);

    StudentResponseDTO updateStudentAcademicRecord(String email, MultipartFile file);

    public Map<String, Object> importStudentsFromExcelOrCsv(MultipartFile file, boolean updateIfExists);
    
    Map<String, Object> updateStudentsFromList(List<Map<String, String>> studentsData);

}
