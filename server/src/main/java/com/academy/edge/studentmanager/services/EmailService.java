package com.academy.edge.studentmanager.services;

import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface EmailService {

    void sendEmail(String to, String subject, String text) throws MessagingException;

    void sendPasswordResetEmail(String to, String resetLink)
            throws MessagingException, IOException;
}