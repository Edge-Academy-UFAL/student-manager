package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.dtos.InstructorResponseDTO;
import com.academy.edge.studentmanager.models.Instructor;
import com.academy.edge.studentmanager.repositories.InstructorRepository;
import com.academy.edge.studentmanager.services.InstructorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class InstructorServiceImpl implements InstructorService {
    final private InstructorRepository instructorRepository;
    final private ModelMapper modelMapper;

    @Autowired
    public InstructorServiceImpl(InstructorRepository instructorRepository, ModelMapper modelMapper) {
        this.instructorRepository = instructorRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public InstructorResponseDTO getInstructorByEmail(String email) {
        Instructor instructor = instructorRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Instructor not found"));
        return modelMapper.map(instructor, InstructorResponseDTO.class);
    }

    @Override
    public List<InstructorResponseDTO> getAllInstructors() {
        List<InstructorResponseDTO> instructors = new ArrayList<>();
        this.instructorRepository.findAll().forEach(instructor -> instructors.add(modelMapper.map(instructor, InstructorResponseDTO.class)));
        return instructors;
    }
}
