package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.configs.ApplicationProperties;
import com.academy.edge.studentmanager.dtos.InvitationErrorDTO;
import com.academy.edge.studentmanager.dtos.InvitationSendResponseDTO;
import com.academy.edge.studentmanager.enums.InvitationErrorType;
import com.academy.edge.studentmanager.models.Invitation;
import com.academy.edge.studentmanager.repositories.InvitationRepository;
import com.academy.edge.studentmanager.repositories.StudentRepository;
import com.academy.edge.studentmanager.services.EmailService;
import com.academy.edge.studentmanager.services.InvitationService;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

@Log4j2
@Service
public class InvitationServiceImpl implements InvitationService {

    private final InvitationRepository invitationRepository;
    private final StudentRepository studentRepository;
    private final EmailService emailService;
    private final ApplicationProperties applicationProperties;
    private final Resource invitationEmail;

    public InvitationServiceImpl(
            EmailService emailService,
            StudentRepository studentRepository,
            InvitationRepository invitationRepository,
            ApplicationProperties applicationProperties,
            @Value("classpath:emails/student-invitation.html") Resource invitationEmail
    ) {
        this.emailService = emailService;
        this.invitationRepository = invitationRepository;
        this.studentRepository = studentRepository;
        this.applicationProperties = applicationProperties;
        this.invitationEmail = invitationEmail;
    }

    @Override
    public Invitation getValidInvitation(String invitationId) {
        return invitationRepository.findByCode(invitationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid invitation code"));
    }

    @Override
    @Transactional
    public void deleteInvitation(Invitation invitation) {
        invitationRepository.delete(invitation);
    }

    @Override
    @Transactional
    public InvitationSendResponseDTO sendInvitations(List<String> emails, int studentGroup, LocalDate entryDate) {
        // FIXME: Erro quando já existe um convite para o mesmo email
        // FIXME: Salvar o invite antes de enviar o email, e enviar de forma assíncrona
        var uniqueEmails = new LinkedHashSet<>(emails);
        var successfulEmails = new ArrayList<String>();
        var failedEmails = new HashMap<String, InvitationErrorDTO>();

        for (var email : uniqueEmails) {
            if (studentRepository.existsByEmail(email)) {
                failedEmails.put(email, new InvitationErrorDTO(InvitationErrorType.ALREADY_REGISTERED, null));
                continue;
            }

            var code = RandomStringUtils.secureStrong().nextAlphanumeric(64);
            
            var invitation = invitationRepository.findByEmail(email).orElse(new Invitation());

            invitation.setEmail(email);
            invitation.setStudentGroup(studentGroup);
            invitation.setEntryDate(entryDate);
            invitation.setCode(code);
            invitationRepository.save(invitation);

            try {
                this.sendInvitationEmail(email, code);
                successfulEmails.add(email);
            } catch (Exception e) {
                log.error("Failed to send invitation email", e);
                failedEmails.put(email, new InvitationErrorDTO(InvitationErrorType.SMTP_ERROR, e.getMessage()));
            }
        }

        return new InvitationSendResponseDTO(successfulEmails, failedEmails);
    }

    private void sendInvitationEmail(String email, String code) throws MessagingException, IOException {
        var registerUrl = this.applicationProperties.frontendUrl() + "/register/" + code;
        var replacements = Map.of("[[URL]]", registerUrl);
        emailService.sendEmailFromTemplate(email, "Bem vindo ao Academy!", this.invitationEmail, replacements);
    }
}
