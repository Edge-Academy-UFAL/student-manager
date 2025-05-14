package com.academy.edge.studentmanager.controllers;


import com.academy.edge.studentmanager.dtos.*;
import org.springframework.beans.factory.annotation.Autowired;

import com.academy.edge.studentmanager.services.GradeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.academy.edge.studentmanager.models.Student;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@RequestMapping("/api/v1/grades")
public class GradeController {

    final GradeService gradeService;

    @Autowired
    public GradeController(GradeService gradeService) {
        this.gradeService = gradeService;
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('ADMIN','INSTRUCTOR') or authentication.name == #gradeUpdateDTO.getStudentEmail()")
    public ResponseEntity<GradeResponseDTO> updateGrade(@Valid @RequestBody GradeUpdateDTO gradeUpdateDTO) {
        GradeResponseDTO gradeResponseDTO = gradeService.updateGrade(gradeUpdateDTO);
        return new ResponseEntity<>(gradeResponseDTO, HttpStatus.OK);
    }
  
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','INSTRUCTOR') or authentication.name == #gradeCreateDTO.getStudentEmail()")
    public ResponseEntity<GradeResponseDTO> saveGrade(@Valid @RequestBody GradeCreateDTO gradeCreateDTO){
        return new ResponseEntity<>(gradeService.saveGrade(gradeCreateDTO), HttpStatus.OK);
    }

    @GetMapping("/{email}")
    @PreAuthorize("hasAnyRole('ADMIN','INSTRUCTOR') or authentication.name == #email")
    public ResponseEntity<List<StudentGradesDTO>> getStudentGrades(@PathVariable String email) {
        return new ResponseEntity<>(gradeService.getStudentGrades(email), HttpStatus.OK);
    }

    @DeleteMapping
    @PreAuthorize("hasAnyRole('ADMIN','INSTRUCTOR') or authentication.name == #gradeDeleteDTO.getStudentEmail()")
    public ResponseEntity<Void> deleteGrade(@Valid @RequestBody GradeDeleteDTO gradeDeleteDTO){
        gradeService.deleteGrade(gradeDeleteDTO);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{email}/ira")
    @PreAuthorize("hasAnyRole('ADMIN','INSTRUCTOR') or authentication.name == #email")
    public ResponseEntity<List<Double>> getStudentIRAPerPeriod(@PathVariable String email) {
        List<Double> studentIRAPerPeriod = gradeService.getStudentIRAPerPeriod(email);
        return new ResponseEntity<>(studentIRAPerPeriod, HttpStatus.OK);
    }

    @GetMapping("/{email}/average")
    @PreAuthorize("hasAnyRole('ADMIN','INSTRUCTOR') or authentication.name == #email")
    public ResponseEntity<List<Double>> getStudentGradesAveragePerPeriod(@PathVariable String email) {
        List<Double> studentGradesAveragePerPeriod = gradeService.getStudentGradesAveragePerPeriod(email);
        return new ResponseEntity<>(studentGradesAveragePerPeriod, HttpStatus.OK);
    }

    //TODO: temporary method to verify user identity
    void verifyUser(String id){
        Student student = (Student) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!student.getId().equals(id)){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Usuário não autorizado para acessar este recurso.");
        }
    }
}
