package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.InvitationRequestDTO;
import com.academy.edge.studentmanager.dtos.StudentCreateDTO;
import com.academy.edge.studentmanager.enums.Course;
import com.academy.edge.studentmanager.models.Student;
import com.academy.edge.studentmanager.repositories.StudentRepository;
import com.fasterxml.jackson.core.type.TypeReference;
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
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.LinkedMultiValueMap;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;
import java.util.regex.Pattern;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasKey;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Transactional
public class InvitationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private StudentRepository studentRepository;

    @RegisterExtension
    static GreenMailExtension greenMail = new GreenMailExtension(ServerSetupTest.SMTP_IMAP).withConfiguration(
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
        assertThat((String)firstMessage.getContent()).contains("https://edge.academy.com/register");
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

        mockMvc.perform(post("/api/v1/register").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isMultiStatus())
                .andExpect(jsonPath("$.successfulEmails").isArray())
                .andExpect(jsonPath("$.successfulEmails.length()").value(1))
                .andExpect(jsonPath("$.failedEmails").isMap())
                .andExpect(jsonPath("$.failedEmails.length()").value(2));

        var receivedMessages = greenMail.getReceivedMessages();
        assertThat(receivedMessages).hasSize(1);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void cannotInviteRegisteredEmail() throws Exception {
        var student = getTestStudent();
        studentRepository.save(student);

        var email = student.getEmail();
        var requestDTO = new InvitationRequestDTO(List.of(email), 1, LocalDate.now());

        mockMvc.perform(post("/api/v1/register").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isMultiStatus())
                .andExpect(jsonPath("$.failedEmails").isMap())
                .andExpect(jsonPath("$.failedEmails.length()").value(1))
                .andExpect(jsonPath("$.failedEmails").value(hasKey(email)))
                .andExpect(jsonPath("$.failedEmails['%s']", email).value("Email já cadastrado"));
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
        var studentCreateDTO = getTestStudentCreateDTO(code);

        mockMvc.perform(get("/api/v1/register/{invitationId}", code))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(emails.get(0)));

        mockMvc.perform(multipart("/api/v1/students").file(getPlaceholderPhoto())
                .params(convertDTOToParams(studentCreateDTO))).andExpect(status().isCreated());
    }

    @Test
    void studentCanSendFormOnlyOnce() throws Exception {
        var emails = List.of("student1@email.com");
        var invitationRequestDTO = new InvitationRequestDTO(emails, 1, LocalDate.now());

        mockMvc.perform(post("/api/v1/register").with(user("admin@admin.com").roles("ADMIN"))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invitationRequestDTO))).andExpect(status().isOk());

        var code = extractActivationCode(greenMail.getReceivedMessages()[0]);
        var studentCreateDTO = getTestStudentCreateDTO(code);

        mockMvc.perform(get("/api/v1/register/{invitationId}", code)).andExpect(status().isOk());

        mockMvc.perform(multipart("/api/v1/students").file(getPlaceholderPhoto())
                .params(convertDTOToParams(studentCreateDTO))).andExpect(status().isCreated());

        mockMvc.perform(get("/api/v1/register/{invitationId}", code)).andExpect(status().isUnauthorized());

        mockMvc.perform(multipart("/api/v1/students").file(getPlaceholderPhoto())
                .params(convertDTOToParams(studentCreateDTO))).andExpect(status().isUnauthorized());
    }

    @Test
    void studentCannotSendFormWithAnotherEmail() throws Exception {
        var emails = List.of("student1@email.com");
        var invitationRequestDTO = new InvitationRequestDTO(emails, 1, LocalDate.now());

        mockMvc.perform(post("/api/v1/register").with(user("admin@admin.com").roles("ADMIN"))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invitationRequestDTO))).andExpect(status().isOk());
        var code = extractActivationCode(greenMail.getReceivedMessages()[0]);
        var studentCreateDTO = getTestStudentCreateDTO(code);

        mockMvc.perform(get("/api/v1/register/{invitationId}", code)).andExpect(status().isOk());

        studentCreateDTO.setEmail("not-" + emails.get(0));
        mockMvc.perform(multipart("/api/v1/students").file(getPlaceholderPhoto())
                .params(convertDTOToParams(studentCreateDTO))).andExpect(status().isUnauthorized());
    }

    Student getTestStudent() {
        var student = modelMapper.map(getTestStudentCreateDTO(""), Student.class);
        student.setEntryDate(LocalDate.now());
        return student;
    }

    StudentCreateDTO getTestStudentCreateDTO(String code) {
        return new StudentCreateDTO(
                "John Doe",
                LocalDate.of(2024, 4, 14),
                "student1@email.com",
                "Edge12345678@",
                Course.COMPUTER_SCIENCE,
                "98765432",
                "82988887777",
                "",
                5,
                "2022.1",
                code
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

    String extractActivationCode(MimeMessage message) throws IOException, MessagingException {
        var content = (String)message.getContent();
        var matcher = Pattern.compile("/register/([^\"']+)").matcher(content);
        assertThat(matcher.find()).isTrue();
        return matcher.group(1);
    }

    LinkedMultiValueMap<String, String> convertDTOToParams(Object dto) {
        var params = new LinkedMultiValueMap<String, String>();
        params.setAll(objectMapper.convertValue(dto, new TypeReference<>() {}));
        return params;
    }
}
