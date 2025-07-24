package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.configs.ApplicationProperties;
import com.academy.edge.studentmanager.dtos.InvitationRequestDTO;
import com.academy.edge.studentmanager.dtos.StudentCreateDTO;
import com.academy.edge.studentmanager.enums.InvitationErrorType;
import com.academy.edge.studentmanager.models.Student;
import com.academy.edge.studentmanager.repositories.StudentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.icegreen.greenmail.configuration.GreenMailConfiguration;
import com.icegreen.greenmail.junit5.GreenMailExtension;
import com.icegreen.greenmail.user.UserException;
import com.icegreen.greenmail.util.ServerSetupTest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.regex.Pattern;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasKey;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Transactional
public class InvitationControllerTests {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ApplicationProperties applicationProperties;

    @RegisterExtension
    private static GreenMailExtension greenMail = new GreenMailExtension(ServerSetupTest.SMTP_IMAP).withConfiguration(
            GreenMailConfiguration.aConfig().withUser("academy@edge.ufal.br", "test", "test"));

    @Test
    @WithMockUser(roles = "ADMIN")
    void adminCanSendInvitations() throws Exception {
        var emails = List.of("student1@email.com", "student2@email.com", "student3@email.com");
        var requestDTO = new InvitationRequestDTO(emails, 1, LocalDate.now());

        mockMvc.perform(post("/api/v1/register").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.successfulEmails").isArray())
                .andExpect(jsonPath("$.successfulEmails.length()").value(3))
                .andExpect(jsonPath("$.failedEmails").isMap())
                .andExpect(jsonPath("$.failedEmails.length()").value(0));

        var receivedMessages = greenMail.getReceivedMessages();
        assertThat(receivedMessages).hasSize(3);

        var firstMessage = receivedMessages[0];
        assertThat(firstMessage.getAllRecipients()).containsExactly(new InternetAddress(emails.get(0)));
        assertThat((String)firstMessage.getContent()).contains(this.applicationProperties.frontendUrl() + "/register/");
    }

    @Test
    @WithMockUser(roles = "STUDENT")
    void studentCannotSendInvitations() throws Exception {
        var emails = List.of("student1@email.com");
        var requestDTO = new InvitationRequestDTO(emails, 1, LocalDate.now());

        mockMvc.perform(post("/api/v1/register").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestDTO))).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void cannotInviteInvalidEmail() throws Exception {
        var emails = List.of("student1.email.com");
        var requestDTO = new InvitationRequestDTO(emails, 1, LocalDate.now());

        mockMvc.perform(post("/api/v1/register").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestDTO))).andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void catchSmtpErrorsWhileSending() throws Exception {
        var emails = List.of("student1@email.com", "student2@email.com", "student3@email.com");
        var requestDTO = new InvitationRequestDTO(emails, 1, LocalDate.now());
        var defaultDeliveryHander = greenMail.getUserManager().getMessageDeliveryHandler();

        greenMail.getUserManager().setMessageDeliveryHandler((msg, mailAddress) -> {
            var email = mailAddress.getEmail();
            if (emails.get(0).equals(email) || emails.get(1).equals(email)) {
                throw new UserException("User not found");
            } else {
                return defaultDeliveryHander.handle(msg, mailAddress);
            }
        });

        var expectedError = InvitationErrorType.SMTP_ERROR.toString();
        mockMvc.perform(post("/api/v1/register").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isMultiStatus())
                .andExpect(jsonPath("$.successfulEmails").isArray())
                .andExpect(jsonPath("$.successfulEmails.length()").value(1))
                .andExpect(jsonPath("$.failedEmails").isMap())
                .andExpect(jsonPath("$.failedEmails.length()").value(2))
                .andExpect(jsonPath("$.failedEmails").value(hasKey(emails.get(0))))
                .andExpect(jsonPath("$.failedEmails['%s'].error", emails.get(0)).value(expectedError));


        var receivedMessages = greenMail.getReceivedMessages();
        assertThat(receivedMessages).hasSize(1);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void cannotInviteRegisteredEmail() throws Exception {
        var student = studentRepository.save(getTestStudent(1));
        var email = student.getEmail();
        var requestDTO = new InvitationRequestDTO(List.of(email), 1, LocalDate.now());

        var expectedError = InvitationErrorType.ALREADY_REGISTERED.toString();
        mockMvc.perform(post("/api/v1/register").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isMultiStatus())
                .andExpect(jsonPath("$.failedEmails").isMap())
                .andExpect(jsonPath("$.failedEmails.length()").value(1))
                .andExpect(jsonPath("$.failedEmails").value(hasKey(email)))
                .andExpect(jsonPath("$.failedEmails['%s'].error", email).value(expectedError));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void canSendInvitationAgain() throws Exception {
        var emails = List.of("student1@email.com");
        var requestDTO = new InvitationRequestDTO(emails, 1, LocalDate.now());

        mockMvc.perform(post("/api/v1/register").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestDTO))).andExpect(status().isOk());
        assertThat(greenMail.getReceivedMessages()).hasSize(1);

        mockMvc.perform(post("/api/v1/register").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestDTO))).andExpect(status().isOk());
        assertThat(greenMail.getReceivedMessages()).hasSize(2);
    }

    @Test
    void studentCanSendForm() throws Exception {
        var emails = List.of("student1@email.com");
        var invitationRequestDTO = new InvitationRequestDTO(emails, 1, LocalDate.now());

        mockMvc.perform(post("/api/v1/register").with(user("admin@admin.com").roles("ADMIN"))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invitationRequestDTO))).andExpect(status().isOk());

        var code = extractActivationCode(greenMail.getReceivedMessages()[0]);

        mockMvc.perform(get("/api/v1/register/{invitationId}", code)).andExpect(status().isNoContent());

        var studentCreateDTO = new StudentCreateDTO("Edge12345678@", code);

        mockMvc.perform(multipart("/api/v1/students").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(studentCreateDTO))).andExpect(status().isCreated());
    }

    @Test
    void studentCanSendFormOnlyOnce() throws Exception {
        var emails = List.of("student1@email.com");
        var invitationRequestDTO = new InvitationRequestDTO(emails, 1, LocalDate.now());

        mockMvc.perform(post("/api/v1/register").with(user("admin@admin.com").roles("ADMIN"))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invitationRequestDTO))).andExpect(status().isOk());

        var code = extractActivationCode(greenMail.getReceivedMessages()[0]);

        mockMvc.perform(get("/api/v1/register/{invitationId}", code)).andExpect(status().isNoContent());

        var studentCreateDTO = new StudentCreateDTO("Edge12345678@", code);

        mockMvc.perform(multipart("/api/v1/students").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(studentCreateDTO))).andExpect(status().isCreated());

        mockMvc.perform(get("/api/v1/register/{invitationId}", code)).andExpect(status().isUnauthorized());

        mockMvc.perform(multipart("/api/v1/students").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(studentCreateDTO))).andExpect(status().isUnauthorized());
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

    String extractActivationCode(MimeMessage message) throws IOException, MessagingException {
        var content = (String)message.getContent();
        var matcher = Pattern.compile("/register/([^\"']+)").matcher(content);
        assertThat(matcher.find()).isTrue();
        return matcher.group(1);
    }
}
