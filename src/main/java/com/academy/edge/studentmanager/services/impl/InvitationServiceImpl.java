package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.dtos.InvitationResponseDTO;
import com.academy.edge.studentmanager.models.Invitation;
import com.academy.edge.studentmanager.repositories.InvitationRepository;
import com.academy.edge.studentmanager.services.EmailService;
import com.academy.edge.studentmanager.services.InvitationService;
import jakarta.transaction.Transactional;
import org.modelmapper.internal.bytebuddy.utility.RandomString;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class InvitationServiceImpl implements InvitationService {

    private final InvitationRepository invitationRepository;
    private final EmailService emailService;

    public InvitationServiceImpl(EmailService emailService, InvitationRepository invitationRepository){
        this.emailService = emailService;
        this.invitationRepository = invitationRepository;
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
    public InvitationResponseDTO sendInvitation(List<String> emails, int studentGroup, String entryDate) {
        InvitationResponseDTO result = new InvitationResponseDTO();
        emails.forEach(email -> {

            try {
                String code = RandomString.make(64);

                Invitation invitation = new Invitation();
                invitation.setEmail(email);
                invitation.setStudentGroup(studentGroup);
                invitation.setEntryDate(Date.valueOf(entryDate));
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

    private String constructHtmlMessageText(String code, String email){
        String content = "Olá,<br><br>"
                + "Estamos muito felizes em dar as boas-vindas a você ao programa Edge Academy! Sua jornada de descoberta e aprimoramento está prestes a começar, e não poderíamos estar mais animados por ter você conosco.<br><br>"
                + "Para garantir uma transição suave para esta nova fase de aprendizado, por favor, realize sua inscrição na plataforma clicando no link abaixo. É um pequeno passo para você, mas um salto gigante em sua trajetória de aprendizado!<br><br>"
                + "<h3 style='text-align: center;'><a href='[[URL]]' target='_self' style='padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;'>REGISTRAR</a></h3><br>"
                + "Caso tenha alguma dúvida ou precise de ajuda ao longo do caminho, não hesite em entrar em contato. Nossa equipe está sempre pronta para auxiliar você em cada etapa da sua jornada.<br><br>"
                + "Com apreço,<br>"
                + "<strong>Equipe Edge Academy</strong><br><br>"
                + "<em>PS: Prepare-se para uma experiência enriquecedora cheia de aprendizado e crescimento. Estamos ansiosos para ver o seu progresso!</em>";
        String siteUrl = "https://edge.academy.com/register/"+code + "?email=" + email;
        content = content.replace("[[URL]]", siteUrl);

        String htmlContent = "<!DOCTYPE html>"
                + "<html>"
                + "<head>"
                + "<style>"
                + "body { font-family: 'Arial', sans-serif; color: #2c3e50; background-color: white; padding: 20px; }"
                + "a.verify-button { padding: 10px 20px; background-color: #52a0b6; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; }"
                + "h3 { text-align: center; }"
                + ".content { background-color: white; padding: 20px;}"
                + "em { color: #2c3e50; }"
                + "strong { color: #2c3e50; }"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class='content'>"
                + "<img src='https://www.edge.ufal.br/wp-content/uploads/2023/03/logo-azul.svg' alt='Logo da Edge Academy' style='display: block; margin-left: auto; margin-right: auto; width: 50%; max-width:200px'>"
                + content
                + "</div>"
                + "</body>"
                + "</html>";

        return htmlContent;
    }
}
