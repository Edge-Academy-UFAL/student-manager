package com.academy.edge.studentmanager.configs;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("email")
public record EmailConfig(String emailSender) {}