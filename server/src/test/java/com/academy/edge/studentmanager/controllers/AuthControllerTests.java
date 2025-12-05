package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.ChangePasswordRequestDTO;
import com.academy.edge.studentmanager.dtos.ForgotPasswordRequestDTO;
import com.academy.edge.studentmanager.dtos.ResetPasswordRequestDTO;
import com.academy.edge.studentmanager.dtos.SignInRequestDTO;
import com.academy.edge.studentmanager.models.Administrator;
import com.academy.edge.studentmanager.models.Student;
import com.academy.edge.studentmanager.repositories.AdministratorRepository;
import com.academy.edge.studentmanager.repositories.StudentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.icegreen.greenmail.configuration.GreenMailConfiguration;
import com.icegreen.greenmail.junit5.GreenMailExtension;
import com.icegreen.greenmail.util.ServerSetupTest;
import com.jayway.jsonpath.JsonPath;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.localstack.LocalStackContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

import java.io.IOException;
import java.time.LocalDate;
import java.util.regex.Pattern;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Transactional
@Testcontainers
public class AuthControllerTests {
    @Container
    static LocalStackContainer localStack = new LocalStackContainer(
        DockerImageName.parse("localstack/localstack:3.0")
    );

    @DynamicPropertySource
    static void overrideProperties(DynamicPropertyRegistry registry) {
        registry.add("aws.access.key", () -> localStack.getAccessKey());
        registry.add("aws.secret.key", () -> localStack.getSecretKey());
        registry.add("aws.s3.region", () -> localStack.getRegion());
        registry.add("aws.s3.bucket", () -> "studentmanager-files");
        registry.add("aws.s3.endpoint", () -> localStack.getEndpointOverride(LocalStackContainer.Service.S3).toString());
    }
    
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AdministratorRepository administratorRepository;

    @Autowired
    private StudentRepository studentRepository;

    @RegisterExtension
    private static GreenMailExtension greenMail = new GreenMailExtension(ServerSetupTest.SMTP_IMAP).withConfiguration(
            GreenMailConfiguration.aConfig().withUser("academy@edge.ufal.br", "test", "test"));

    @Test
    void adminCanLogin() throws Exception {
        var administrator = administratorRepository.save(getTestAdministrator());
        var requestDTO = new SignInRequestDTO(administrator.getEmail(), "Admin123");

        var result = mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isString())
                .andReturn();

        var token = JsonPath.read(result.getResponse().getContentAsString(), "$.token");

        mockMvc.perform(get("/api/v1/auth/me").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(administrator.getName()));
    }

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
    
    // FIXME: re-enable these tests after fixing the email template issue
//     @Test
//     void studentCanResetPassword() throws Exception {
//         var student1 = studentRepository.save(getTestStudent(1));
//         var newPassword = "Admin321";
//         var signInRequestDTO = new SignInRequestDTO(student1.getEmail(), newPassword);

//         mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(signInRequestDTO))).andExpect(status().isForbidden());

//         var forgetPasswordRequestDTO = new ForgotPasswordRequestDTO(student1.getEmail());

//         mockMvc.perform(post("/api/v1/auth/forgot-password").contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(forgetPasswordRequestDTO))).andExpect(status().isNoContent());

//         var token = extractResetPasswordToken(greenMail.getReceivedMessages()[0]);
//         var resetPasswordRequestDTO = new ResetPasswordRequestDTO(token, newPassword);

//         mockMvc.perform(post("/api/v1/auth/reset-password").contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(resetPasswordRequestDTO))).andExpect(status().isNoContent());

//         mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(signInRequestDTO))).andExpect(status().isOk()).andReturn();
//     }

//     @Test
//     void studentCannotReuseResetPasswordToken() throws Exception {
//         var student1 = studentRepository.save(getTestStudent(1));
//         var forgetPasswordRequestDTO = new ForgotPasswordRequestDTO(student1.getEmail());

//         mockMvc.perform(post("/api/v1/auth/forgot-password").contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(forgetPasswordRequestDTO))).andExpect(status().isNoContent());

//         var token = extractResetPasswordToken(greenMail.getReceivedMessages()[0]);
//         var resetPasswordRequestDTO = new ResetPasswordRequestDTO(token, "Admin321");

//         mockMvc.perform(post("/api/v1/auth/reset-password").contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(resetPasswordRequestDTO))).andExpect(status().isNoContent());

//         mockMvc.perform(post("/api/v1/auth/reset-password").contentType(MediaType.APPLICATION_JSON)
//                         .content(objectMapper.writeValueAsString(resetPasswordRequestDTO)))
//                 .andExpect(status().isUnauthorized());
//     }

    @Test
    void studentCanChangePassword() throws Exception {
        var student1 = studentRepository.save(getTestStudent(1));

        var oldPassword = "Edge12345678@";
        var newPassword = "Edge87654321@";

        var oldSignInRequestDTO = new SignInRequestDTO(student1.getEmail(), oldPassword);
        var newSignInRequestDTO = new SignInRequestDTO(student1.getEmail(), newPassword);

        mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newSignInRequestDTO))).andExpect(status().isForbidden());

        var result = mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(oldSignInRequestDTO))).andExpect(status().isOk()).andReturn();

        var token = JsonPath.read(result.getResponse().getContentAsString(), "$.token");
        var changePasswordRequestDTO = new ChangePasswordRequestDTO(oldPassword, newPassword);

        mockMvc.perform(post("/api/v1/auth/change-password").header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(changePasswordRequestDTO))).andExpect(status().isNoContent());

        mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newSignInRequestDTO))).andExpect(status().isOk()).andReturn();
    }

    @Test
    void studentCannotSendWrongOldPassword() throws Exception {
        var student1 = studentRepository.save(getTestStudent(1));
        var signInRequestDTO = new SignInRequestDTO(student1.getEmail(), "Edge12345678@");

        var result = mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(signInRequestDTO))).andExpect(status().isOk()).andReturn();

        var token = JsonPath.read(result.getResponse().getContentAsString(), "$.token");
        var changePasswordRequestDTO = new ChangePasswordRequestDTO("EdgeINVALID@", "Edge87654321@");

        mockMvc.perform(post("/api/v1/auth/change-password").header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(changePasswordRequestDTO))).andExpect(status().isForbidden());
    }

    String extractResetPasswordToken(MimeMessage message) throws IOException, MessagingException {
        var content = (String)message.getContent();
        var matcher = Pattern.compile("<a href=\"([^\"']+)").matcher(content);
        assertThat(matcher.find()).isTrue();
        return matcher.group(1);
    }

    Administrator getTestAdministrator() {
        var administrator = new Administrator();
        administrator.setName("John Doe");
        administrator.setEmail("admin1@email.com");
        administrator.setPassword(passwordEncoder.encode("Admin123"));
        return administrator;
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
}
