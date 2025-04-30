package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.dtos.InvitationResponseDTO;
import com.academy.edge.studentmanager.models.Invitation;
import com.academy.edge.studentmanager.repositories.InvitationRepository;
import com.academy.edge.studentmanager.services.EmailService;
import com.academy.edge.studentmanager.services.InvitationService;
import jakarta.transaction.Transactional;
import org.modelmapper.internal.bytebuddy.utility.RandomString;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;

@Service
public class InvitationServiceImpl implements InvitationService {

    private final InvitationRepository invitationRepository;
    private final EmailService emailService;
    private final String invitationEmailTemplate;

    public InvitationServiceImpl(
            EmailService emailService,
            InvitationRepository invitationRepository,
            ResourceLoader resourceLoader
    ) throws IOException {
        this.emailService = emailService;
        this.invitationRepository = invitationRepository;

        var resource = resourceLoader.getResource("classpath:templates/invitation-email.html");
        this.invitationEmailTemplate = resource.getContentAsString(StandardCharsets.UTF_8);
    }

    @Override
    public Invitation isInvitationValid(String invitationId, String email) {
        return invitationRepository.findByCodeAndEmail(invitationId, email);
    }

    @Override
    public void deleteInvitation(String invitationId, String email) {
        Invitation invitation = invitationRepository.findByCodeAndEmail(invitationId, email);
        invitationRepository.delete(invitation);
    }

    @Override
    @Transactional
    public InvitationResponseDTO sendInvitation(List<String> emails, int studentGroup, LocalDate entryDate) {
        InvitationResponseDTO result = new InvitationResponseDTO();
        emails.forEach(email -> {

            try {
                String code = RandomString.make(64);

                Invitation invitation = new Invitation();
                invitation.setEmail(email);
                invitation.setStudentGroup(studentGroup);
                invitation.setEntryDate(entryDate);
                invitation.setCode(code);

                invitationRepository.save(invitation);
                emailService.sendEmail(email, "Bem vindo ao Academy!", this.constructHtmlMessageText(code, email));

                result.getSuccessfulEmails().add(email);
            } catch (Exception e){
                System.out.println(e);
                result.getFailedEmails().add(email);
            }
        });

        return result;
    }

    private String constructHtmlMessageText(String code, String email) {
        var siteUrl = "https://edge.academy.com/register/" + code + "?email=" + email;
        return this.invitationEmailTemplate.replace("[[URL]]", siteUrl);
    }
}
