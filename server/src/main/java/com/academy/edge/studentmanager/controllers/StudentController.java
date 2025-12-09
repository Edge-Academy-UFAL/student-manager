package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.StudentCreateDTO;
import com.academy.edge.studentmanager.dtos.StudentResponseDTO;
import com.academy.edge.studentmanager.dtos.StudentUpdateDTO;
import com.academy.edge.studentmanager.services.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.academy.edge.studentmanager.dtos.StudentTerminateDTO;

import java.util.List;

@RestController
@RequestMapping("/api/v1/students")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<StudentResponseDTO>> getAllStudents(){
        return new ResponseEntity<>(studentService.getStudents(), HttpStatus.OK);
    }

    @GetMapping({"/{id}"})
    @PreAuthorize("hasAnyRole('ADMIN') or authentication.principal.id == #id")
    public ResponseEntity<StudentResponseDTO> getStudent(@PathVariable String id){
        return new ResponseEntity<>(studentService.getStudentById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<StudentResponseDTO> registerStudent(@RequestBody @Valid StudentCreateDTO studentCreateDTO){
        return new ResponseEntity<>(studentService.createStudent(studentCreateDTO), HttpStatus.CREATED);
    }

    @DeleteMapping({"/{email}"})
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Void> deleteStudent(@PathVariable String email){
        studentService.deleteStudent(email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping({"/{email}"})
    @PreAuthorize("hasAnyRole('ADMIN') or authentication.name == #email")
    public ResponseEntity<StudentResponseDTO> updateStudentByEmail(@PathVariable String email,
                                                     @RequestBody @Valid StudentUpdateDTO studentUpdateDTO) {
        StudentResponseDTO studentResponseDTO = studentService.updateStudent(email, studentUpdateDTO);

        return new ResponseEntity<>(studentResponseDTO, HttpStatus.OK);
    }

    @PutMapping({"/{email}/photo"})
    @PreAuthorize("hasAnyRole('ADMIN') or authentication.name == #email")
    public ResponseEntity<StudentResponseDTO> updateStudentPhotoByEmail(@PathVariable String email,
                                                                        @RequestParam("photo") MultipartFile file) {
        StudentResponseDTO studentResponseDTO = studentService.updateStudentPhoto(email, file);

        return new ResponseEntity<>(studentResponseDTO, HttpStatus.OK);
    }

    @PutMapping({"/{email}/record"})
    @PreAuthorize("hasAnyRole('ADMIN') or authentication.name == #email")
    public ResponseEntity<StudentResponseDTO> updateStudentAcademicRecordByEmail(
            @PathVariable String email,
            @RequestParam("photo") MultipartFile file) {
        StudentResponseDTO studentResponseDTO = studentService.updateStudentAcademicRecord(email, file);

        return new ResponseEntity<>(studentResponseDTO, HttpStatus.OK);
    }

    @PostMapping("/{email}/terminate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> terminateStudent(
            @PathVariable String email,
            @RequestBody @Valid StudentTerminateDTO dto) {
        studentService.terminateStudent(email, dto.getTerminationReason());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
