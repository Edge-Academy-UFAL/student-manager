package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.StudentResponseDTO;
import com.academy.edge.studentmanager.enums.Course;
import com.academy.edge.studentmanager.services.StudentService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.*;
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

    @MockitoBean
    private StudentService studentService;

    @Test
    @WithMockUser(roles = {"INSTRUCTOR"})
    void instructorCanAccessAllStudents() throws Exception {
        StudentResponseDTO studentResponseDTO1 = new StudentResponseDTO();
        studentResponseDTO1.setId("1");
        studentResponseDTO1.setName("John Doe");
        studentResponseDTO1.setPhotoUrl("https://example.com/photo.jpg");
        studentResponseDTO1.setCourse(Course.COMPUTER_SCIENCE);

        StudentResponseDTO studentResponseDTO2 = new StudentResponseDTO();
        studentResponseDTO2.setId("2");
        studentResponseDTO2.setName("John Doe");
        studentResponseDTO2.setPhotoUrl("https://example.com/photo.jpg");
        studentResponseDTO2.setCourse(Course.COMPUTER_SCIENCE);

        when(studentService.getStudents()).thenReturn(List.of(studentResponseDTO1, studentResponseDTO2));

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
    @WithMockUser(roles = {"ADMIN"})
    void adminCanDeleteAStudentAccount() throws Exception{
        String userEmail = "admin@example.com";
        mockMvc.perform(delete("/api/v1/students/{email}", userEmail))
                .andExpect(status().isNoContent());

        verify(studentService).deleteStudent(userEmail);
    }

    @Test
    @WithMockUser(roles = {"STUDENT"}, username = "user@edge.ufal.br")
    void studentCantDeleteAccount() throws Exception{
        String userEmail = "user@edge.ufal.br";
        mockMvc.perform(delete("/api/v1/students/{email}", userEmail))
                .andExpect(status().isForbidden());

        verify(studentService, times(0)).deleteStudent(userEmail);
    }
}
