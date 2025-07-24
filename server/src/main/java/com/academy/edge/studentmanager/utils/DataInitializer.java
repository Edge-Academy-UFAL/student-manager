package com.academy.edge.studentmanager.utils;


import com.academy.edge.studentmanager.enums.Course;
import com.academy.edge.studentmanager.models.Student;
import com.academy.edge.studentmanager.models.Administrator;
import com.academy.edge.studentmanager.models.Invitation;
import com.academy.edge.studentmanager.repositories.AdministratorRepository;
import com.academy.edge.studentmanager.repositories.StudentRepository;
import com.academy.edge.studentmanager.repositories.InvitationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@Profile("dev")
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final AdministratorRepository administratorRepository;

    private final StudentRepository studentRepository;

    private final InvitationRepository invitationRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (administratorRepository.findByEmail("admin@admin.com").isEmpty()) {
            Administrator administrator = new Administrator();
            administrator.setName("Admin");
            administrator.setEmail("admin@admin.com");
            administrator.setPassword(passwordEncoder.encode("Admin123"));
            administratorRepository.save(administrator);
        }

        if (studentRepository.findByEmail("fulano.santos@edge.ufal.br").isEmpty()) {
            var student = new Student();
            student.setName("Fulano da Silva Santos");
            student.setEmail("fulano.santos@edge.ufal.br");
            student.setPassword(passwordEncoder.encode("Aluno123"));
            student.setCourse(Course.COMPUTER_SCIENCE);
            student.setRegistration("22111533");
            student.setPhone("82940028922");
            student.setPeriod(3);
            student.setEntryPeriod("2022.1");
            student.setStudentGroup(1);
            student.setEntryDate(LocalDate.now());
            student.setBirthDate(LocalDate.now());
            studentRepository.save(student);
        }

        // Initialize 50 invitations for manual testing purposes :D
        for (int i = 0; i < 50; i++) {
            Invitation invitation = new Invitation();

            invitation.setEmail(String.format("test%d@edge.ufal.br", i));
            invitation.setStudentGroup(1);
            invitation.setEntryDate(LocalDate.of(2001, 1, 1));
            invitation.setCode(String.valueOf(i));

            invitationRepository.save(invitation);
        }
    }
}
