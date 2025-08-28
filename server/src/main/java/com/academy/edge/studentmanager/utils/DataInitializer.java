package com.academy.edge.studentmanager.utils;


import com.academy.edge.studentmanager.enums.Course;
import com.academy.edge.studentmanager.models.Administrator;
import com.academy.edge.studentmanager.models.Student;
import com.academy.edge.studentmanager.repositories.AdministratorRepository;
import com.academy.edge.studentmanager.repositories.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.text.Normalizer;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.Locale;
import java.util.Random;

@Component
@Profile("dev")
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final AdministratorRepository administratorRepository;
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    private static final String[] randomNames = new String[] {
        "Davi Machado da Silva",
        "Guilherme Correia Mendes",
        "Fernando de Souza Azevedo",
        "Eduardo Nunes Ribeiro",
        "Osvaldo Simões Santana",
        "Lúcia Teixeira Mendes",
        "Joaquim Reis Marques",
        "Júlio Vieira Sousa",
        "João Simões Lopes",
        "Leonardo Silva Mendes",
        "Alexandre Soares Marques",
        "Carlos Araújo Carvalho",
        "Vítor da Costa Fonseca",
        "Mateus Pereira Lima",
        "Gabriel Tavares Lopes",
        "Adriano Lopes Marques",
        "Camila Soares de Souza",
        "José Silva Vieira",
        "Ricardo Vieira Bezerra",
        "João de Oliveira Gomes",
        "Rodrigo Sousa dos Santos",
        "Tiago de Carvalho Araújo",
        "Otávio Cruz Dias",
        "Pedro Moreira Alves",
        "Paulo Ramos Ribeiro",
        "Bárbara Fonseca Gonçalves",
        "Vítor Neves de Oliveira",
        "Guilherme Rocha de Araujo",
        "Lúcia Fernandes Costa",
        "Daniel Silva de Lima",
    };

    @Override
    public void run(String[] args) {
        if (administratorRepository.findByEmail("admin@admin.com").isEmpty()) {
            var administrator = new Administrator();
            administrator.setName("Admin");
            administrator.setEmail("admin@admin.com");
            administrator.setPassword(passwordEncoder.encode("Admin123"));
            administratorRepository.save(administrator);
        }

        if (!studentRepository.existsBy()) {
            var random = new Random(12345);
            var shuffledNames = Arrays.asList(randomNames);
            Collections.shuffle(shuffledNames, random);

            for (var name : shuffledNames) {
                random.setSeed(name.hashCode());

                var email = generateEmail(name);
                var course = random.nextBoolean() ? Course.COMPUTER_SCIENCE : Course.COMPUTER_ENGINEERING;
                var registration = random.nextInt(20000000, 26000000);
                var phone = random.nextInt(10000000, 100000000);
                var entryYear = random.nextInt(2020, 2026);
                var period = random.nextInt(2, 9);
                var entrySemester = random.nextInt(1, 3);
                var entryPeriod = entryYear + "." + entrySemester;
                var studentGroup = random.nextInt(1, 6);

                var student = new Student();
                student.setName(name);
                student.setEmail(email);
                student.setPassword(passwordEncoder.encode("Aluno123"));
                student.setCourse(course);
                student.setRegistration(String.valueOf(registration));
                student.setPhone("829" + phone);
                student.setPeriod(period);
                student.setEntryPeriod(entryPeriod);
                student.setStudentGroup(studentGroup);
                student.setEntryDate(LocalDate.now());
                student.setBirthDate(LocalDate.now());
                studentRepository.save(student);
            }
        }
    }

    private String generateEmail(String name) {
        var parts = name.toLowerCase(Locale.ROOT).split(" ");
        return removeAccents(parts[0] + "." + parts[parts.length - 1]) + "@edge.ufal.br";
    }

    private String removeAccents(String value) {
        // https://stackoverflow.com/a/3322174
        return Normalizer.normalize(value, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "");
    }

}
