package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.dtos.SubjectResponseDTO;
import com.academy.edge.studentmanager.services.SubjectService;
import com.academy.edge.studentmanager.repositories.SubjectRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class SubjectServiceImpl implements SubjectService{
    final SubjectRepository subjectRepository;

    final ModelMapper modelMapper;

    @Override
    public List<SubjectResponseDTO> getSubjects() {
        List<SubjectResponseDTO> subjects = new ArrayList<>();
        subjectRepository.findAll(Sort.by("name")).forEach(subject -> subjects.add(modelMapper.map(subject, SubjectResponseDTO.class)));
        return subjects;
    }
}
