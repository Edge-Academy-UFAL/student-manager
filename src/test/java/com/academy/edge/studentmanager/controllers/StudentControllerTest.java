package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.StudentCreateDTO;
import com.academy.edge.studentmanager.dtos.StudentResponseDTO;
import com.academy.edge.studentmanager.enums.Course;
import com.academy.edge.studentmanager.services.StudentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class StudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudentService studentService;

    @Test
    @WithMockUser(roles = {"INSTRUCTOR"})
    void instructorCanAccessAllStudents() throws Exception {
        List<StudentResponseDTO> students = new ArrayList<>();
        students.add(new StudentResponseDTO("1", "John Doe", "About John Doe", "http://example.com/photo.jpg", "https://www.linkedin.com/in/johndoe", Course.COMPUTER_SCIENCE, "2023-2027"));
        students.add(new StudentResponseDTO("2", "John Doe", "About John Doe", "http://example.com/photo.jpg", "https://www.linkedin.com/in/johndoe", Course.COMPUTER_SCIENCE, "2023-2027"));
        when(studentService.getStudents()).thenReturn(students);

        mockMvc.perform(get("/api/v1/students"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    @WithMockUser(roles = {"STUDENT"})
    void studentCannotAccessAllStudent() throws Exception {
        when(studentService.getStudents()).thenReturn(Collections.emptyList());
        mockMvc.perform(get("/api/v1/students"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = {"INSTRUCTOR"})
    void instructorCanAccessStudent() throws Exception {
        String userId = "uuid";
        String userEmail = "student@email.com";
        StudentResponseDTO studentResponseDTO = new StudentResponseDTO();
        studentResponseDTO.setId(userId);
        when(studentService.getStudentByEmail(userEmail)).thenReturn(studentResponseDTO);

        mockMvc.perform(get("/api/v1/students/{email}", userEmail))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(userId));
    }

    @Test
    @WithMockUser(roles = {"STUDENT"}, username = "student1@email.com")
    void studentCanAccessOwnResource() throws Exception {
        String userId = "uuid";
        String userEmail = "student1@email.com";
        StudentResponseDTO studentResponseDTO = new StudentResponseDTO();
        studentResponseDTO.setId(userId);
        when(studentService.getStudentByEmail(userEmail)).thenReturn(studentResponseDTO);

        mockMvc.perform(get("/api/v1/students/{email}", userEmail))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(userId));
    }

    @Test
    @WithMockUser(roles = {"STUDENT"}, username = "student1@email.com")
    void studentCantAccessAnotherResource() throws Exception{
        String userEmail = "student@email.com";

        mockMvc.perform(get("/api/v1/students/{email}", userEmail))
                .andExpect(status().isForbidden());
    }

    @Test
    void itShouldCreateAStudent() throws Exception{
        ObjectMapper mapper = new ObjectMapper();
        StudentCreateDTO studentCreateDTO = new StudentCreateDTO("John Doe", "2024-04-14","john@email.com", "Edge12345678@", Course.COMPUTER_SCIENCE,
                                                        "98765432", "82988887777", "", 5, "2022.1", "4CT1V4T3");
        String jsonStudentDTO = mapper.writeValueAsString(studentCreateDTO);
        mockMvc.perform(post("/api/v1/students")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonStudentDTO))
                .andExpect(status().isCreated());
    }

    @Test
    @WithMockUser(roles = {"ADMIN"})
    void adminCanDeleteAStudentAccount() throws Exception{
        String userEmail = "admin@example.com";
        mockMvc.perform(delete("/api/v1/students/{email}", userEmail))
                .andExpect(status().isNoContent());

        verify(studentService).deleteStudent(userEmail);
    }

    @Test
    @WithMockUser(roles = {"STUDENT", "INSTRUCTOR"}, username = "user@edge.ufal.br")
    void instructorOrUserCantDeleteAccount() throws Exception{
        String userEmail = "user@edge.ufal.br";
        mockMvc.perform(delete("/api/v1/students/{email}", userEmail))
                .andExpect(status().isForbidden());

        verify(studentService, times(0)).deleteStudent(userEmail);
    }
}
