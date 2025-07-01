package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.services.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender emailSender;
    private final ResourceLoader resourceLoader;

    @Autowired
    public EmailServiceImpl(JavaMailSender emailSender, ResourceLoader resourceLoader
    ) {
        this.emailSender = emailSender;
        this.resourceLoader = resourceLoader;
    }

    @Override
    public void sendEmail(String to, String subject, String text) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");

        helper.setFrom("academy@edge.ufal.br");
        helper.setTo(to);
        helper.setSubject(subject);

        helper.setText(text, true);

        emailSender.send(message);
    }

    public void sendPasswordResetEmail(String to, String resetLink) {
        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

            var resource = this.resourceLoader.getResource("classpath:emails/forget-password.html");
            String htmlBody = resource.getContentAsString(StandardCharsets.UTF_8);

            htmlBody = htmlBody.replace("{{LINK_REDEFINICAO}}", resetLink);

            helper.setTo(to);
            helper.setSubject("Redefinição de Senha - SuaApp");
            helper.setText(htmlBody, true);
            helper.setFrom("nao-responda@suaapp.com");

            emailSender.send(mimeMessage);

        } catch (MessagingException | IOException e) {
            throw new IllegalStateException("Falha ao enviar o e-mail de redefinição de senha.");
        }
    }


}
