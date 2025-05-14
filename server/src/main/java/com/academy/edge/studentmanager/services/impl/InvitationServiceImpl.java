package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.dtos.InvitationSendResponseDTO;
import com.academy.edge.studentmanager.models.Invitation;
import com.academy.edge.studentmanager.repositories.InvitationRepository;
import com.academy.edge.studentmanager.repositories.StudentRepository;
import com.academy.edge.studentmanager.services.EmailService;
import com.academy.edge.studentmanager.services.InvitationService;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;

@Log4j2
@Service
public class InvitationServiceImpl implements InvitationService {

    private final InvitationRepository invitationRepository;
    private final StudentRepository studentRepository;
    private final EmailService emailService;
    private final String invitationEmailTemplate;

    public InvitationServiceImpl(
            EmailService emailService,
            StudentRepository studentRepository,
            InvitationRepository invitationRepository,
            ResourceLoader resourceLoader
    ) throws IOException {
        this.emailService = emailService;
        this.invitationRepository = invitationRepository;
        this.studentRepository = studentRepository;

        var resource = resourceLoader.getResource("classpath:templates/invitation-email.html");
        this.invitationEmailTemplate = resource.getContentAsString(StandardCharsets.UTF_8);
    }

    @Override
    public Invitation getValidInvitation(String invitationId) {
        return invitationRepository.findByCode(invitationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid invitation code"));
    }

    @Override
    public void deleteInvitation(Invitation invitation) {
        invitationRepository.delete(invitation);
    }

    @Override
    @Transactional
    public InvitationSendResponseDTO sendInvitations(List<String> emails, int studentGroup, LocalDate entryDate) {
        var uniqueEmails = new LinkedHashSet<>(emails);
        var successfulEmails = new ArrayList<String>();
        var failedEmails = new HashMap<String, String>();

        for (var email : uniqueEmails) {
            if (studentRepository.existsByEmail(email)) {
                failedEmails.put(email, "Email já cadastrado");
                continue;
            }

            var code = RandomStringUtils.secureStrong().nextAlphanumeric(64);
            var invitation = new Invitation();
            invitation.setEmail(email);
            invitation.setStudentGroup(studentGroup);
            invitation.setEntryDate(entryDate);
            invitation.setCode(code);

            try {
                invitationRepository.save(invitation);
                emailService.sendEmail(email, "Bem vindo ao Academy!", this.constructHtmlMessageText(code));
                successfulEmails.add(email);
            } catch (Exception e) {
                log.error("Failed to send invitation email", e);
                failedEmails.put(email, "Não foi possível enviar o convite: " + e.getMessage());
            }
        }

        return new InvitationSendResponseDTO(successfulEmails, failedEmails);
    }

    private String constructHtmlMessageText(String code) {
        var registerUrl = "https://edge.academy.com/register/" + code;
        return this.invitationEmailTemplate.replace("[[URL]]", registerUrl);
    }
}
