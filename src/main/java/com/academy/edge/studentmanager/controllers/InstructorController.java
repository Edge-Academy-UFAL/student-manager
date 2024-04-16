package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.InstructorResponseDTO;
import com.academy.edge.studentmanager.services.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@PreAuthorize("isAuthenticated()")
@RestController
@RequestMapping("/api/v1/instructors")
public class InstructorController {
    final InstructorService instructorService;

    @Autowired
    public InstructorController(InstructorService instructorService) {
        this.instructorService = instructorService;
    }

    @GetMapping
    public ResponseEntity<List<InstructorResponseDTO>> getAllInstructors(){
        return new ResponseEntity<>(instructorService.getAllInstructors(), HttpStatus.OK);
    }

    @GetMapping({"/{email}"})
    public ResponseEntity<InstructorResponseDTO> getInstructor(@PathVariable String email){
        return new ResponseEntity<>(instructorService.getInstructorByEmail(email), HttpStatus.OK);
    }
}
