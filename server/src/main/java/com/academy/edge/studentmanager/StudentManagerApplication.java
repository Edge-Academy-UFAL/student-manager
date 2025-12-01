package com.academy.edge.studentmanager;

import com.academy.edge.studentmanager.configs.ApplicationProperties;
import com.academy.edge.studentmanager.configs.EmailConfig;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableConfigurationProperties({ApplicationProperties.class, EmailConfig.class})
public class StudentManagerApplication {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static void main(String[] args) {
        SpringApplication.run(StudentManagerApplication.class, args);
    }

}
