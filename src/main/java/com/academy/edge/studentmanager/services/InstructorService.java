package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.InstructorResponseDTO;

import java.util.List;

public interface InstructorService {
    InstructorResponseDTO getInstructorByEmail(String email);
    List<InstructorResponseDTO> getAllInstructors();
}
