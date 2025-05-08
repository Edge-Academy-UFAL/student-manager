package com.academy.edge.studentmanager.models;

import com.academy.edge.studentmanager.enums.Course;
import com.academy.edge.studentmanager.enums.Role;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Formula;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.sql.Date;
import java.util.Collection;
import java.util.Collections;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "students")
@PrimaryKeyJoinColumn(name="id")
public class Student extends User{
    public static final int MAX_NUM_DEGREE_SEMESTER_COMPUTER_SCIENCE = 12;
    public static final int MAX_NUM_DEGREE_SEMESTER_COMPUTER_ENGINEERING = 15;

    @Column
    private Date birthDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    Course course;

    @Column(nullable = false)
    String registration;

    @Column(nullable = false)
    private String phone;

    @Column()
    private String secondaryPhone;

    @Column(nullable = false)
    private int period;

    @Column(nullable = false)
    private String entryPeriod;

    @Column(nullable = false)
    private int studentGroup;

    @Column()
    private String academicRecordUrl;

    @Column(nullable = false)
    private Date entryDate;

    /* This formula calculates the IRA based in a weighted average of the Student grades
        and the workload of the subjects of this grades
        See more: https://ufal.br/resolucoes/2023/rco-n-77-de-24-10-2023.pdf (Art. 48) */
    @Formula("ROUND(CAST((SELECT SUM(g.final_grade * s.workload) / SUM(s.workload) " +
            "FROM grades g " +
            "JOIN subjects s ON g.subject_code = s.code " +
            "WHERE g.student_id = id AND g.subject_status != 'ENROLLED') AS NUMERIC), 2)")
    private Double IRA;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_"+ Role.STUDENT.name()));
    }

    @Override
    public String getDtype() {
        return "Student";
    }
}
