package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.SubjectResponseDTO;

import java.util.List;

public interface SubjectService {
    List<SubjectResponseDTO> getSubjects();
}
