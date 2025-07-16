package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.StudentTerminateDTO;
import com.academy.edge.studentmanager.dtos.StudentUpdateDTO;
import com.academy.edge.studentmanager.enums.Course;
import com.academy.edge.studentmanager.models.Student;
import com.academy.edge.studentmanager.repositories.StudentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Transactional
public class StudentControllerTests {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private StudentRepository studentRepository;

    @Test
    @WithMockUser(roles = "ADMIN")
    void adminCanAccessAllStudents() throws Exception {
        studentRepository.save(getTestStudent(1));
        studentRepository.save(getTestStudent(2));

        mockMvc.perform(get("/api/v1/students"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    @WithMockUser(roles = "STUDENT")
    void studentCannotAccessAllStudent() throws Exception {
        mockMvc.perform(get("/api/v1/students")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = {"ADMIN"})
    void adminCanAccessStudent() throws Exception {
        var student1 = studentRepository.save(getTestStudent(1));

        mockMvc.perform(get("/api/v1/students/{email}", student1.getEmail()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isString())
                .andExpect(jsonPath("$.email").value(student1.getEmail()));
    }

    @Test
    @WithMockUser(roles = "STUDENT", username = "student1@email.com")
    void studentCanAccessOwnResource() throws Exception {
        var student1 = studentRepository.save(getTestStudent(1));

        mockMvc.perform(get("/api/v1/students/{email}", student1.getEmail()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isString())
                .andExpect(jsonPath("$.email").value(student1.getEmail()));
    }

    @Test
    @WithMockUser(roles = "STUDENT", username = "student1@email.com")
    void studentCannotAccessAnotherResource() throws Exception {
        var student2 = studentRepository.save(getTestStudent(2));

        mockMvc.perform(get("/api/v1/students/{email}", student2.getEmail())).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void adminCanDeleteStudentAccount() throws Exception {
        var student1 = studentRepository.save(getTestStudent(1));

        mockMvc.perform(delete("/api/v1/students/{email}", student1.getEmail())).andExpect(status().isNoContent());

        mockMvc.perform(get("/api/v1/students/{email}", student1.getEmail())).andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "STUDENT", username = "student1@email.com")
    void studentCannotDeleteAccount() throws Exception {
        var student1 = studentRepository.save(getTestStudent(1));

        mockMvc.perform(delete("/api/v1/students/{email}", student1.getEmail())).andExpect(status().isForbidden());

        mockMvc.perform(get("/api/v1/students/{email}", student1.getEmail())).andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void adminCanTerminateStudentAccount() throws Exception {
        var student1 = studentRepository.save(getTestStudent(1));
        var requestDTO = new StudentTerminateDTO("Comeu toda a pipoca.");

        mockMvc.perform(post(
                "/api/v1/students/{email}/terminate",
                student1.getEmail()
        ).contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestDTO))).andExpect(status().isNoContent());

        mockMvc.perform(get("/api/v1/students/{email}", student1.getEmail())).andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "STUDENT", username = "student1@email.com")
    void studentCannotTerminateAccount() throws Exception {
        var student1 = studentRepository.save(getTestStudent(1));
        var requestDTO = new StudentTerminateDTO("Comeu toda a pipoca.");

        mockMvc.perform(post(
                "/api/v1/students/{email}/terminate",
                student1.getEmail()
        ).contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestDTO))).andExpect(status().isForbidden());

        mockMvc.perform(get("/api/v1/students/{email}", student1.getEmail())).andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = "STUDENT", username = "student1@email.com")
    void studentCanUpdateData() throws Exception {
        var student1 = studentRepository.save(getTestStudent(1));
        var studentUpdateDTO = getTestStudentUpdateDTO();

        mockMvc.perform(patch("/api/v1/students/{email}", student1.getEmail()).contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(studentUpdateDTO))).andExpect(status().isOk());

        mockMvc.perform(multipart(HttpMethod.PUT, "/api/v1/students/{email}/photo", student1.getEmail()).file(
                getPlaceholderPhoto())).andExpect(status().isOk());
    }

    Student getTestStudent(int i) {
        var student = new Student();
        student.setEmail("student" + i + "@email.com");
        student.setName(student.getEmail().split("@", 1)[0]);
        student.setEntryDate(LocalDate.now());
        student.setStudentGroup(1);
        student.setPassword(passwordEncoder.encode("Edge12345678@"));
        return student;
    }

    StudentUpdateDTO getTestStudentUpdateDTO() {
        return new StudentUpdateDTO(
                "John Doe",
                LocalDate.of(2024, 4, 14),
                Course.COMPUTER_SCIENCE,
                "98765432",
                "82988887777",
                "",
                5,
                "2022.1",
                ""
        );
    }

    MockMultipartFile getPlaceholderPhoto() {
        return new MockMultipartFile(
                "photo",
                "photo.jpg",
                MediaType.IMAGE_JPEG_VALUE,
                "placeholder-data".getBytes(StandardCharsets.US_ASCII)
        );
    }
}
