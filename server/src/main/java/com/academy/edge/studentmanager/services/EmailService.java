package com.academy.edge.studentmanager.services;

import jakarta.mail.MessagingException;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
public interface EmailService {
    void sendEmail(String to, String subject, String text) throws MessagingException;

    void sendEmailFromTemplate(String to, String subject, Resource resource, Map<String, String> replacements)
            throws IOException, MessagingException;
}