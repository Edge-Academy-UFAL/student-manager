package com.academy.edge.studentmanager.configs;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("application")
public record ApplicationProperties(String frontendUrl, String jwtSecret) {}
