package com.academy.edge.studentmanager.mappers;

import com.academy.edge.studentmanager.dtos.StudentImportDTO;
import com.academy.edge.studentmanager.models.Student;
import com.academy.edge.studentmanager.enums.Course;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;

public class StudentMapper {

    private static final DateTimeFormatter DTF = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public static StudentImportDTO toImportDTO(Student s) {
        StudentImportDTO dto = new StudentImportDTO();

        dto.setNome(s.getName());
        dto.setCpf(s.getCpf());
        dto.setNascimento(s.getBirthDate() != null ? s.getBirthDate().format(DTF) : null);
        dto.setEmail(s.getEmail());
        dto.setTelefone(s.getPhone());
        dto.setTelefone2(s.getSecondaryPhone());
        dto.setMatricula(s.getRegistration());
        dto.setCurso(s.getCourse() != null ? s.getCourse().name() : null);
        dto.setNivel(s.getLevel());
        dto.setEntrada(s.getEntryDate() != null ? s.getEntryDate().format(DTF) : null);
        dto.setPeriodoEntrada(s.getEntryPeriod());
        dto.setPeriodo(s.getPeriod());
        dto.setTurma(s.getStudentGroup());

        return dto;
    }

    public static Student fromMap(Map<String, String> row, PasswordEncoder encoder) {
        Student student = new Student();
        student.setName(row.get("nome"));
        student.setCpf(row.get("cpf").replaceAll("[^\\d]", ""));
        student.setBirthDate(LocalDate.parse(row.get("nascimento"), DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        student.setEmail(row.get("email"));
        student.setPassword(encoder.encode(student.getCpf())); // já está limpo
        student.setPhone(row.get("telefone").replaceAll("[^\\d]", ""));
        student.setSecondaryPhone(row.getOrDefault("telefone2", null));
        student.setRegistration(row.get("matricula"));
        student.setCourse(Course.valueOf(row.get("curso")));
        student.setLevel(row.get("nível"));
        student.setEntryDate(LocalDate.parse(row.get("entrada"), DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        student.setEntryPeriod(row.get("período_entrada"));
        student.setPeriod(Integer.parseInt(row.get("período")));
        student.setStudentGroup(Integer.parseInt(row.get("turma")));
        return student;
    }

    private static String formatDate(LocalDate date) {
        return date.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    }
}
