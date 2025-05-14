package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.StudentCreateDTO;
import com.academy.edge.studentmanager.dtos.StudentResponseDTO;
import com.academy.edge.studentmanager.dtos.StudentUpdateDTO;
import com.academy.edge.studentmanager.services.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/students")
public class StudentController {
    final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','INSTRUCTOR')")
    public ResponseEntity<List<StudentResponseDTO>> getAllStudents(){
        return new ResponseEntity<>(studentService.getStudents(), HttpStatus.OK);
    }

    @GetMapping({"/{email}"})
    @PreAuthorize("hasAnyRole('ADMIN','INSTRUCTOR') or authentication.name == #email")
    public ResponseEntity<StudentResponseDTO> getStudent(@PathVariable String email){
        return new ResponseEntity<>(studentService.getStudentByEmail(email), HttpStatus.OK);
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<StudentResponseDTO> saveStudent(@ModelAttribute @Valid StudentCreateDTO studentCreateDTO,
                                                          @RequestParam("photo") MultipartFile file){
        return new ResponseEntity<>(studentService.insertStudent(studentCreateDTO, file), HttpStatus.CREATED);
    }

    @DeleteMapping({"/{email}"})
    @PreAuthorize("hasAnyRole('ADMIN','INSTRUCTOR')")
    public ResponseEntity<Void> deleteStudent(@PathVariable String email){
        studentService.deleteStudent(email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping({"/{email}"})
    @PreAuthorize("hasAnyRole('ADMIN','INSTRUCTOR') or authentication.name == #email")
    public ResponseEntity<StudentResponseDTO> updateStudentByEmail(@PathVariable String email,
                                                     @RequestBody @Valid StudentUpdateDTO studentUpdateDTO) {
        StudentResponseDTO studentResponseDTO = studentService.updateStudent(email, studentUpdateDTO);

        return new ResponseEntity<>(studentResponseDTO, HttpStatus.OK);
    }

    @PutMapping({"/{email}/photo"})
    @PreAuthorize("hasAnyRole('ADMIN','INSTRUCTOR') or authentication.name == #email")
    public ResponseEntity<StudentResponseDTO> updateStudentPhotoByEmail(@PathVariable String email,
                                                                        @RequestParam("photo") MultipartFile file) {
        StudentResponseDTO studentResponseDTO = studentService.updateStudentPhoto(email, file);

        return new ResponseEntity<>(studentResponseDTO, HttpStatus.OK);
    }

    @PutMapping({"/{email}/record"})
    @PreAuthorize("hasAnyRole('ADMIN', 'INSTRUCTOR') or authentication.name == #email")
    public ResponseEntity<StudentResponseDTO> updateStudentAcademicRecordByEmail(
            @PathVariable String email,
            @RequestParam("photo") MultipartFile file) {
        StudentResponseDTO studentResponseDTO = studentService.updateStudentAcademicRecord(email, file);

        return new ResponseEntity<>(studentResponseDTO, HttpStatus.OK);
    }
}
