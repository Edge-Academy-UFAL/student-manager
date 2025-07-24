package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.AdministratorCreateDTO;
import com.academy.edge.studentmanager.models.Administrator;
import com.academy.edge.studentmanager.repositories.AdministratorRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.icegreen.greenmail.configuration.GreenMailConfiguration;
import com.icegreen.greenmail.junit5.GreenMailExtension;
import com.icegreen.greenmail.user.UserException;
import com.icegreen.greenmail.util.ServerSetupTest;
import jakarta.mail.internet.InternetAddress;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Transactional
public class AdministratorControllerTests {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AdministratorRepository administratorRepository;

    @RegisterExtension
    private static GreenMailExtension greenMail = new GreenMailExtension(ServerSetupTest.SMTP_IMAP).withConfiguration(
            GreenMailConfiguration.aConfig().withUser("academy@edge.ufal.br", "test", "test"));

    @Test
    @WithMockUser(roles = "ADMIN")
    void canRegisterAdmin() throws Exception {
        var requestDTO = new AdministratorCreateDTO("John Doe", "admin1@email.com", "");

        mockMvc.perform(post("/api/v1/administrators").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestDTO))).andExpect(status().isCreated());

        var receivedMessages = greenMail.getReceivedMessages();
        assertThat(receivedMessages).isNotEmpty();

        var message = receivedMessages[0];
        assertThat(message.getAllRecipients()).containsExactly(new InternetAddress(requestDTO.getEmail()));

        var pattern = "<span class=\"password\">(?!\\[\\[PASSWORD\\]\\])[^<]+</span>";
        assertThat((String)message.getContent()).containsPattern(pattern);
    }

    @Test
    @WithMockUser(roles = "STUDENT")
    void nonAdminCannotRegisterAdmin() throws Exception {
        var requestDTO = new AdministratorCreateDTO("John Doe", "admin1@email.com", "");

        mockMvc.perform(post("/api/v1/administrators").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestDTO))).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void cannotRegisterInvalidEmail() throws Exception {
        var requestDTO = new AdministratorCreateDTO("John Doe", "admin1.email.com", "");

        mockMvc.perform(post("/api/v1/administrators").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestDTO))).andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void catchSmtpErrorsWhileSending() throws Exception {
        var requestDTO = new AdministratorCreateDTO("John Doe", "admin1@email.com", "");

        greenMail.getUserManager().setMessageDeliveryHandler((msg, mailAddress) -> {
            throw new UserException("User not found");
        });

        mockMvc.perform(post("/api/v1/administrators").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestDTO))).andExpect(status().isInternalServerError());

        var receivedMessages = greenMail.getReceivedMessages();
        assertThat(receivedMessages).hasSize(0);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void cannotRegisterEmailAgain() throws Exception {
        var administrator = administratorRepository.save(getTestAdministrator());
        var requestDTO = new AdministratorCreateDTO(administrator.getName(), administrator.getEmail(), "");

        mockMvc.perform(post("/api/v1/administrators").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestDTO))).andExpect(status().isConflict());
    }

    Administrator getTestAdministrator() {
        var administrator = new Administrator();
        administrator.setName("John Doe");
        administrator.setEmail("admin1@email.com");
        administrator.setPassword(passwordEncoder.encode("Admin123"));
        return administrator;
    }
}
