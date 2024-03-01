package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.StudentCreateDTO;
import com.academy.edge.studentmanager.dtos.StudentResponseDTO;
import com.academy.edge.studentmanager.services.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping()
    public ResponseEntity<StudentResponseDTO> saveStudent(@Valid @RequestBody StudentCreateDTO studentCreateDTO){
        return new ResponseEntity<>(studentService.insertStudent(studentCreateDTO), HttpStatus.CREATED);
    }

    @DeleteMapping({"/{email}"})
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Void> deleteStudent(@PathVariable String email){
        studentService.deleteStudent(email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
