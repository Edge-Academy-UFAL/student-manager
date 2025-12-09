package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.configs.EmailConfig;
import com.academy.edge.studentmanager.services.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender emailSender;
    private final EmailConfig emailConfig;

    @Override
    public void sendEmail(String to, String subject, String text) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");

        helper.setFrom(emailConfig.emailSender());
        helper.setTo(to);
        helper.setSubject(subject);

        helper.setText(text, true);
        emailSender.send(message);

    }

    @Override
    public void sendEmailFromTemplate(String to, String subject, Resource resource, Map<String, String> replacements)
            throws IOException, MessagingException {
        var text = resource.getContentAsString(StandardCharsets.UTF_8);

        for (var entry : replacements.entrySet()) {
            text = text.replace(entry.getKey(), entry.getValue());
        }

        sendEmail(to, subject, text);
    }

}
