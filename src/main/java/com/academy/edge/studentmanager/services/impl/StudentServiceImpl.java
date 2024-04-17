package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.dtos.StudentCreateDTO;
import com.academy.edge.studentmanager.dtos.StudentResponseDTO;
import com.academy.edge.studentmanager.models.Student;
import com.academy.edge.studentmanager.repositories.StudentRepository;
import com.academy.edge.studentmanager.services.InvitationService;
import com.academy.edge.studentmanager.services.S3Service;
import com.academy.edge.studentmanager.services.StudentService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.*;

@Service
public class StudentServiceImpl implements StudentService {
    final StudentRepository studentRepository;

    final ModelMapper modelMapper;

    final PasswordEncoder passwordEncoder;

    final InvitationService invitationService;

    final S3Service s3Service;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder, InvitationService invitationService, S3Service s3Service) {
        this.studentRepository = studentRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.invitationService = invitationService;
        this.s3Service = s3Service;
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
    public StudentResponseDTO insertStudent(StudentCreateDTO studentCreateDTO, MultipartFile file) {

        if(!file.getContentType().equals("image/jpeg")
                && !file.getContentType().equals("image/png")
                && !file.getContentType().equals("image/jpeg")){
            throw  new ResponseStatusException(BAD_REQUEST, "File is not a PNG file");
        }
        if (!invitationService.isInvitationValid(studentCreateDTO.getActivationCode(), studentCreateDTO.getEmail())) {
            throw new ResponseStatusException(FORBIDDEN, "Invalid invitation code");
        }
        Student student = modelMapper.map(studentCreateDTO, Student.class);
        student.setPassword(passwordEncoder.encode(studentCreateDTO.getPassword()));
        student.setPhotoUrl(student.getRegistration()+"_"+file.getOriginalFilename());
        try {
            studentRepository.save(student);
            s3Service.uploadFile(student.getPhotoUrl(), file);
        } catch (IOException e) {
            s3Service.deleteFile(student.getPhotoUrl());
            throw new RuntimeException(e);
        }
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
