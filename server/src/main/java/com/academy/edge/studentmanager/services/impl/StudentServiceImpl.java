package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.dtos.StudentCreateDTO;
import com.academy.edge.studentmanager.dtos.StudentResponseDTO;
import com.academy.edge.studentmanager.dtos.StudentUpdateDTO;
import com.academy.edge.studentmanager.models.Student;
import com.academy.edge.studentmanager.repositories.StudentRepository;
import com.academy.edge.studentmanager.services.InvitationService;
import com.academy.edge.studentmanager.services.S3Service;
import com.academy.edge.studentmanager.services.StudentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import static org.springframework.http.HttpStatus.*;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;

    private final ModelMapper modelMapper;

    private final PasswordEncoder passwordEncoder;

    private final InvitationService invitationService;

    private final S3Service s3Service;

    private static final List<String> imageContentTypes = Arrays.asList("image/png", "image/jpeg", "image/jpg");
    private static final String documentContentType = "application/pdf";


    @Override
    public List<StudentResponseDTO> getStudents() {
        List<StudentResponseDTO> students = new ArrayList<>();
        this.studentRepository.findAll()
                .forEach(student -> students.add(modelMapper.map(student, StudentResponseDTO.class)));
        return students;
    }

    @Override
    public StudentResponseDTO getStudentByEmail(String email) {
        Student student = this.getStudentEntityByEmail(email);
        return modelMapper.map(student, StudentResponseDTO.class);
    }

    @Override
    public StudentResponseDTO getStudentById(String id) {
        Student student = this.getStudentEntityById(id);
        return modelMapper.map(student, StudentResponseDTO.class);
    }

    @Override
    @Transactional
    public StudentResponseDTO createStudent(StudentCreateDTO studentCreateDTO) {
        var invitation = invitationService.getValidInvitation(studentCreateDTO.getActivationCode());

        var student = new Student();
        student.setName(invitation.getEmail().split("@", 1)[0].replace('.', ' '));
        student.setEmail(invitation.getEmail());
        student.setEntryDate(invitation.getEntryDate());
        student.setStudentGroup(invitation.getStudentGroup());
        student.setPassword(passwordEncoder.encode(studentCreateDTO.getPassword()));

        studentRepository.save(student);
        invitationService.deleteInvitation(invitation);
        return modelMapper.map(student, StudentResponseDTO.class);
    }

    @Override
    @Transactional
    public StudentResponseDTO updateStudent(String email, StudentUpdateDTO studentUpdateDTO) {
        Student student = this.getStudentEntityByEmail(email);

        modelMapper.map(studentUpdateDTO, student);
        studentRepository.save(student);

        return modelMapper.map(student, StudentResponseDTO.class);
    }

    @Override
    @Transactional
    public StudentResponseDTO updateStudentPhoto(String email, MultipartFile file) {
        Student student = this.getStudentEntityByEmail(email);

        if (!imageContentTypes.contains(file.getContentType())) {
            throw new ResponseStatusException(BAD_REQUEST, "File is not a image file");
        }

        String newPhotoUrl = student.getRegistration() + "_" + file.getOriginalFilename();
        String oldPhotoUrl = student.getPhotoUrl();

        if (newPhotoUrl.equals(student.getPhotoUrl())) {
            newPhotoUrl = student.getRegistration() + "_new_" + file.getOriginalFilename();
        }

        try {
            s3Service.uploadFile(newPhotoUrl, file);

            if (oldPhotoUrl != null) {
                s3Service.deleteFile(oldPhotoUrl);
            }
        } catch (IOException e) {
            s3Service.deleteFile(newPhotoUrl);
            throw new ResponseStatusException(INTERNAL_SERVER_ERROR, "Error uploading the file");
        }

        student.setPhotoUrl(newPhotoUrl);
        studentRepository.save(student);

        return modelMapper.map(student, StudentResponseDTO.class);
    }

    @Override
    @Transactional
    public void deleteStudent(String email) {
        Student student = this.getStudentEntityByEmail(email);
        student.setDeleted(true);
        studentRepository.save(student);
    }

    @Override
    @Transactional
    public StudentResponseDTO updateStudentAcademicRecord(String email, MultipartFile file) {
        long MAX_RECORD_FILE_SIZE = 2000000L; // 2MB

        Student student = this.getStudentEntityByEmail(email);

        if (!Objects.equals(file.getContentType(), documentContentType)) {
            throw new ResponseStatusException(BAD_REQUEST, "File is not a PDF file");
        }

        if (file.getSize() > MAX_RECORD_FILE_SIZE) {
            throw new ResponseStatusException(BAD_REQUEST, "File size is biggest than 2MB");
        }

        LocalDate currentDate = LocalDate.now();

        // e.g. format: "historico_JohnDoe_2024-01-04.pdf
        String oldAcademicRecordUrl = student.getAcademicRecordUrl();
        String newAcademicRecordUrl = "historico_" + student.getName() + "_" + currentDate + "_" + ".pdf";

        try {
            if (!Objects.equals(oldAcademicRecordUrl, newAcademicRecordUrl)
                    && oldAcademicRecordUrl != null
                    && !oldAcademicRecordUrl.isEmpty()) {
                s3Service.deleteFile(oldAcademicRecordUrl);
            }
            // O sistema da S3 atualiza o arquivos de mesmo nome, sobrescrevendo
            s3Service.uploadFile(newAcademicRecordUrl, file);
        } catch (IOException e) {
            s3Service.deleteFile(newAcademicRecordUrl);
            throw new ResponseStatusException(INTERNAL_SERVER_ERROR, "Error in uploading file");
        }

        student.setAcademicRecordUrl(newAcademicRecordUrl);
        studentRepository.save(student);

        return modelMapper.map(student, StudentResponseDTO.class);
    }

    @Override
    @Transactional
    public void terminateStudent(String email, String terminationReason) {
        Student student = this.getStudentEntityByEmail(email);
        student.setTerminationReason(terminationReason);
        student.setDeleted(true);
        studentRepository.save(student);
    }

    private Student getStudentEntityByEmail(String email) {
        return studentRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found"));
    }

    private Student getStudentEntityById(String id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found"));
    }
}
