package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.dtos.StudentCreateDTO;
import com.academy.edge.studentmanager.dtos.StudentResponseDTO;
import com.academy.edge.studentmanager.models.Invitation;
import com.academy.edge.studentmanager.models.Student;
import com.academy.edge.studentmanager.repositories.StudentRepository;
import com.academy.edge.studentmanager.services.InvitationService;
import com.academy.edge.studentmanager.services.S3Service;
import com.academy.edge.studentmanager.services.StudentService;
import com.academy.edge.studentmanager.services.CsvReaderService;
import com.academy.edge.studentmanager.services.ExcelReaderService;
import com.academy.edge.studentmanager.dtos.StudentUpdateDTO;
import com.academy.edge.studentmanager.dtos.StudentImportDTO;
import com.academy.edge.studentmanager.enums.Course;
import com.academy.edge.studentmanager.mappers.StudentMapper;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Map;
import java.util.HashMap;
import java.util.Iterator;
import javax.swing.SingleSelectionModel;

import static org.springframework.http.HttpStatus.*;

@Service
public class StudentServiceImpl implements StudentService {
    final StudentRepository studentRepository;

    final ModelMapper modelMapper;

    final PasswordEncoder passwordEncoder;

    final InvitationService invitationService;

    final S3Service s3Service;

    final ExcelReaderService excelReaderService;

    final CsvReaderService csvReaderService;

    private static final List<String> imageContentTypes = Arrays.asList("image/png", "image/jpeg", "image/jpg");
    private static final String documentContentType = "application/pdf";

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder, InvitationService invitationService, S3Service s3Service, ExcelReaderService excelReaderService, CsvReaderService csvReaderService) {
        this.studentRepository = studentRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.invitationService = invitationService;
        this.s3Service = s3Service;
        this.excelReaderService = excelReaderService;
        this.csvReaderService = csvReaderService;
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

        if(!imageContentTypes.contains(file.getContentType())){
            throw  new ResponseStatusException(BAD_REQUEST, "File is not a image file");
        }

        Invitation invitation = invitationService.getValidInvitation(studentCreateDTO.getActivationCode());

        if (!invitation.getEmail().equals(studentCreateDTO.getEmail())) {
            throw new ResponseStatusException(UNAUTHORIZED, "Invalid email for invitation");
        }

        Student student = modelMapper.map(studentCreateDTO, Student.class);
        student.setName(student.getName().trim());
        student.setEntryDate(invitation.getEntryDate());
        student.setStudentGroup(invitation.getStudentGroup());
        student.setPassword(passwordEncoder.encode(studentCreateDTO.getPassword()));
        student.setPhotoUrl(student.getRegistration()+"_"+file.getOriginalFilename());

        try {
            studentRepository.save(student);
            invitationService.deleteInvitation(invitation);
            s3Service.uploadFile(student.getPhotoUrl(), file);
        } catch (IOException e) {
            s3Service.deleteFile(student.getPhotoUrl());
            throw new RuntimeException(e);
        }
        return modelMapper.map(student, StudentResponseDTO.class);
    }

    @Override
    @Transactional
    public Map<String, Object> importStudentsFromExcelOrCsv(MultipartFile file, boolean updateIfExists) {
        Map<String, Object> result;

        try {
            if (file.getOriginalFilename().endsWith(".xlsx")) {
                result = excelReaderService.readExcel(file);
            } else if (file.getOriginalFilename().endsWith(".csv")) {
                result = csvReaderService.readCsv(file);
            } else {
                throw new ResponseStatusException(BAD_REQUEST, "Formato de arquivo não suportado");
            }
        } catch (Exception e) {
            throw new ResponseStatusException(INTERNAL_SERVER_ERROR, "Erro ao ler arquivo: " + e.getMessage(), e);
        }

        @SuppressWarnings("unchecked")
        List<Map<String, String>> importedRows = (List<Map<String, String>>) result.get("imported");
        List<StudentImportDTO> duplicates = new ArrayList<>();
        
        
        
        Iterator<Map<String, String>> iterator = importedRows.iterator();

        while (iterator.hasNext()) {
            Map<String, String> row = iterator.next();

            ModelMapper modelMapperUpdate = new ModelMapper();
        
            modelMapperUpdate.typeMap(Student.class, Student.class).addMappings(mapper -> {
                mapper.skip(Student::setId);
            });

            Student student = StudentMapper.fromMap(row, passwordEncoder);
            studentRepository.findByRegistration(student.getRegistration())
                    .ifPresentOrElse(existingStudent -> {
                        if (updateIfExists) {
                            modelMapperUpdate.map(student, existingStudent);
                            studentRepository.save(existingStudent);
                        } else {
                            duplicates.add(StudentMapper.toImportDTO(existingStudent));
                            iterator.remove();
                            result.put("total_imported", ((Integer) result.get("total_imported")) - 1);
                        }
                    }, () -> {
                        studentRepository.save(student);
                    });
        }

        result.put("duplicates", duplicates);
        return result;
    }

    @Override
    @Transactional
    public Map<String, Object> updateStudentsFromList(List<Map<String, String>> studentsData) {
        List<String> updated = new ArrayList<>();
        List<String> notFound = new ArrayList<>();

        for (Map<String, String> studentMap : studentsData) {
            String registration = studentMap.get("matricula");

            studentRepository.findByRegistration(registration)
                .ifPresentOrElse(existingStudent -> {
                    Student updatedData = StudentMapper.fromMap(studentMap, passwordEncoder);

                    existingStudent.setName(updatedData.getName());
                    existingStudent.setCpf(updatedData.getCpf());
                    existingStudent.setBirthDate(updatedData.getBirthDate());
                    existingStudent.setEmail(updatedData.getEmail());
                    existingStudent.setPhone(updatedData.getPhone());
                    existingStudent.setSecondaryPhone(updatedData.getSecondaryPhone());
                    existingStudent.setCourse(updatedData.getCourse());
                    existingStudent.setLevel(updatedData.getLevel());
                    existingStudent.setEntryDate(updatedData.getEntryDate());
                    existingStudent.setEntryPeriod(updatedData.getEntryPeriod());
                    existingStudent.setPeriod(updatedData.getPeriod());
                    existingStudent.setStudentGroup(updatedData.getStudentGroup());

                    studentRepository.save(existingStudent);
                    updated.add(registration);
                }, () -> notFound.add(registration));
        }

        Map<String, Object> result = new HashMap<>();
        result.put("updated", updated);
        result.put("not_found", notFound);
        return result;
    }

    @Override
    public StudentResponseDTO updateStudent(String email, StudentUpdateDTO studentUpdateDTO) {
        Student student = studentRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found with email: " + email));

        modelMapper.map(studentUpdateDTO, student);
        studentRepository.save(student);

        return modelMapper.map(student, StudentResponseDTO.class);
    }

    @Override
    public StudentResponseDTO updateStudentPhoto(String email, MultipartFile file) {
        Student student = studentRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found with email: " + email));

        if(!imageContentTypes.contains(file.getContentType())){
            throw new ResponseStatusException(BAD_REQUEST, "File is not a image file");
        }

        String newPhotoUrl = student.getRegistration() + "_" + file.getOriginalFilename();
        String oldPhotoUrl = student.getPhotoUrl();

        if (newPhotoUrl.equals(student.getPhotoUrl())) {
            newPhotoUrl = student.getRegistration() + "_new_" + file.getOriginalFilename();
        }

        try {
            s3Service.uploadFile(newPhotoUrl, file);
            s3Service.deleteFile(oldPhotoUrl);
        } catch (IOException e) {
            s3Service.deleteFile(newPhotoUrl);
            throw new ResponseStatusException(INTERNAL_SERVER_ERROR, "Error uploading the file");
        }

        student.setPhotoUrl(newPhotoUrl);
        studentRepository.save(student);

        return modelMapper.map(student, StudentResponseDTO.class);
    }

    @Override
    public void deleteStudent(String email) {
        Student student = studentRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found"));
        student.setDeleted(true);
        studentRepository.save(student);
    }

    @Override
    public StudentResponseDTO updateStudentAcademicRecord(String email, MultipartFile file) {
        long MAX_RECORD_FILE_SIZE = 2000000L; // 2MB

        Student student = studentRepository.findByEmail(email).orElseThrow(
                () -> new ResponseStatusException(NOT_FOUND, "Student not found"));

        if(!Objects.equals(file.getContentType(), documentContentType)){
            throw new ResponseStatusException(BAD_REQUEST, "File is not a PDF file");
        }

        if(file.getSize() > MAX_RECORD_FILE_SIZE) {
            throw new ResponseStatusException(BAD_REQUEST, "File size is biggest than 2MB");
        }

        LocalDate currentDate = LocalDate.now();

        // e.g. format: "historico_JohnDoe_2024-01-04.pdf
        String oldAcademicRecordUrl = student.getAcademicRecordUrl();
        String newAcademicRecordUrl =  "historico_" + student.getName() + "_" + currentDate + "_" + ".pdf";

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
}
