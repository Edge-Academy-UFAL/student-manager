package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.StudentCreateDTO;
import com.academy.edge.studentmanager.enums.Course;
import com.academy.edge.studentmanager.models.Student;
import com.academy.edge.studentmanager.repositories.StudentRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
    private ModelMapper modelMapper;

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
    @WithMockUser(roles = "ADMIN")
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
        student.setEntryDate(LocalDate.now());
        return student;
    }
}
