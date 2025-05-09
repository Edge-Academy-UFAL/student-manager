package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.StudentCreateDTO;
import com.academy.edge.studentmanager.dtos.StudentResponseDTO;
import com.academy.edge.studentmanager.services.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.academy.edge.studentmanager.dtos.TerminateStudentDTO;

import java.util.List;

@RestController
@RequestMapping("/api/v1/students")
public class StudentController {
    private final StudentService studentService;

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
                                                          @RequestParam("file") MultipartFile file){
        return new ResponseEntity<>(studentService.insertStudent(studentCreateDTO, file), HttpStatus.CREATED);
    }

    @DeleteMapping({"/{email}"})
    @PreAuthorize("hasAnyRole('ADMIN','INSTRUCTOR')")
    public ResponseEntity<Void> deleteStudent(@PathVariable String email){
        studentService.deleteStudent(email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PatchMapping("/{email}/terminate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> terminateStudent(
            @PathVariable String email,
            @RequestBody @Valid TerminateStudentDTO dto) {
        studentService.terminateStudent(email, dto.getTerminationReason());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
