package com.academy.edge.studentmanager.utils;


import com.academy.edge.studentmanager.enums.InstructorSpecialization;
import com.academy.edge.studentmanager.models.Instructor;
import com.academy.edge.studentmanager.repositories.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public void run(String... args) {
        if (instructorRepository.findByEmail("admin@admin.com").isEmpty()) {
            Instructor instructor = new Instructor();
            instructor.setName("Admin");
            instructor.setEmail("admin@admin.com");
            instructor.setPassword(passwordEncoder.encode("Admin123"));
            instructor.setSpecialization(InstructorSpecialization.TECHNICAL);
            instructorRepository.save(instructor);
        }
    }
}
