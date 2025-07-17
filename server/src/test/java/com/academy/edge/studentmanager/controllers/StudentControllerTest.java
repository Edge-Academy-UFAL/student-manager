package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.SignInRequestDTO;
import com.academy.edge.studentmanager.dtos.StudentCreateDTO;
import com.academy.edge.studentmanager.dtos.StudentTerminateDTO;
import com.academy.edge.studentmanager.enums.Course;
import com.academy.edge.studentmanager.models.Student;
import com.academy.edge.studentmanager.repositories.StudentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Transactional
public class StudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private StudentRepository studentRepository;

    @Test
    void studentCanLogin() throws Exception {
        var student = studentRepository.save(getTestStudent(1));
        var requestDTO = new SignInRequestDTO(student.getEmail(), "Edge12345678@");

        var result = mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isString())
                .andReturn();

        var token = JsonPath.read(result.getResponse().getContentAsString(), "$.token");

        mockMvc.perform(get("/api/v1/auth/me").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(student.getName()));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void administratorCanAccessAllStudents() throws Exception {
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
    void administratorCanAccessStudent() throws Exception {
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

        mockMvc.perform(patch(
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

        mockMvc.perform(patch(
                "/api/v1/students/{email}/terminate",
                student1.getEmail()
        ).contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestDTO))).andExpect(status().isForbidden());

        mockMvc.perform(get("/api/v1/students/{email}", student1.getEmail())).andExpect(status().isOk());
    }

    Student getTestStudent(int i) {
        var createDTO = new StudentCreateDTO(
                "John Doe " + i,
                LocalDate.of(2024, 4, 14),
                "student" + i + "@email.com",
                "Edge12345678@",
                Course.COMPUTER_SCIENCE,
                "98765432",
                "82988887777",
                "",
                5,
                "2022.1",
                ""
        );
        var student = modelMapper.map(createDTO, Student.class);
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        student.setEntryDate(LocalDate.now());
        return student;
    }
}
