package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.SubjectResponseDTO;
import com.academy.edge.studentmanager.services.SubjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/subjects")
public class SubjectController {
    final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<SubjectResponseDTO>> getAllSubjects() {
        return new ResponseEntity<>(subjectService.getSubjects(), HttpStatus.OK);
    }
}
