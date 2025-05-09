package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.dtos.StudentCreateDTO;
import com.academy.edge.studentmanager.dtos.StudentResponseDTO;
import com.academy.edge.studentmanager.models.Invitation;
import com.academy.edge.studentmanager.models.Student;
import com.academy.edge.studentmanager.repositories.InvitationRepository;
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
import java.util.Arrays;
import java.util.List;

import static org.springframework.http.HttpStatus.*;

@Service
public class StudentServiceImpl implements StudentService {
    final StudentRepository studentRepository;

    final ModelMapper modelMapper;

    final PasswordEncoder passwordEncoder;

    final InvitationService invitationService;

    final S3Service s3Service;

    private static final List<String> contentTypes = Arrays.asList("image/png", "image/jpeg", "image/jpg");

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

        if(!contentTypes.contains(file.getContentType())){
            throw  new ResponseStatusException(BAD_REQUEST, "File is not a image file");
        }

        Invitation invitation = invitationService.isInvitationValid(studentCreateDTO.getActivationCode(), studentCreateDTO.getEmail());

        if(invitation == null){
            throw new ResponseStatusException(FORBIDDEN, "Invalid invitation code");
        }
  
        Student student = modelMapper.map(studentCreateDTO, Student.class);
        student.setEntryDate(invitation.getEntryDate());
        student.setStudentGroup(invitation.getStudentGroup());
        student.setPassword(passwordEncoder.encode(studentCreateDTO.getPassword()));
        student.setPhotoUrl(student.getRegistration()+"_"+file.getOriginalFilename());
      
        try {
            studentRepository.save(student);
            invitationService.deleteInvitation(studentCreateDTO.getActivationCode(), studentCreateDTO.getEmail());
            s3Service.uploadFile(student.getPhotoUrl(), file);
        } catch (IOException e) {
            s3Service.deleteFile(student.getPhotoUrl());
            throw new RuntimeException(e);
        }
        return modelMapper.map(student, StudentResponseDTO.class);
    }

    @Override
    public void deleteStudent(String email) {
        Student student = studentRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found"));
        student.setDeleted(true);
        studentRepository.save(student);
    }
    @Override
    public void terminateStudent(String email, String terminationReason) {
        Student student = studentRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found"));
        student.setTerminationReason(terminationReason);
        student.setDeleted(true);
        studentRepository.save(student);
    }
}
