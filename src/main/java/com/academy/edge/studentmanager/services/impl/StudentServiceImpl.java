package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.dtos.StudentCreateDTO;
import com.academy.edge.studentmanager.dtos.StudentResponseDTO;
import com.academy.edge.studentmanager.models.Invitation;
import com.academy.edge.studentmanager.models.Student;
import com.academy.edge.studentmanager.repositories.InvitationRepository;
import com.academy.edge.studentmanager.repositories.StudentRepository;
import com.academy.edge.studentmanager.services.InvitationService;
import com.academy.edge.studentmanager.services.StudentService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class StudentServiceImpl implements StudentService {
    final StudentRepository studentRepository;

    final InvitationRepository invitationRepository;

    final ModelMapper modelMapper;

    final PasswordEncoder passwordEncoder;

    final InvitationService invitationService;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository, InvitationRepository invitationRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder, InvitationService invitationService) {
        this.studentRepository = studentRepository;
        this.invitationRepository = invitationRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.invitationService = invitationService;
    }

    @Override
    public List<StudentResponseDTO> getStudents() {
        List<StudentResponseDTO> students = new ArrayList<>();
        this.studentRepository.findAll().forEach(student -> students.add(modelMapper.map(student, StudentResponseDTO.class)));
        return students;
    }

    @Override
    public StudentResponseDTO getStudentByEmail(String email) {
        Student student = studentRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found"));
        return modelMapper.map(student, StudentResponseDTO.class);
    }

    @Override
    @Transactional
    public StudentResponseDTO insertStudent(StudentCreateDTO studentCreateDTO) {
        Invitation invitation = invitationService.isInvitationValid(studentCreateDTO.getActivationCode(), studentCreateDTO.getEmail());

        if(invitation == null){
            throw new ResponseStatusException(FORBIDDEN, "Invitation not found");
        }

        Student student = modelMapper.map(studentCreateDTO, Student.class);
        student.setEntryDate(invitation.getEntryDate());
        student.setStudentGroup(invitation.getStudentGroup());
        student.setPassword(passwordEncoder.encode(studentCreateDTO.getPassword()));
        student = studentRepository.save(student);
        invitationService.deleteInvitation(studentCreateDTO.getActivationCode(), studentCreateDTO.getEmail());
        return modelMapper.map(student, StudentResponseDTO.class);
    }

    @Override
    public void deleteStudent(String email) {
        Student student = studentRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found"));
        student.setDeleted(true);
        studentRepository.save(student);
    }
}
