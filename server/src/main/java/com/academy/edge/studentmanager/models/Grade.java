package com.academy.edge.studentmanager.models;

import com.academy.edge.studentmanager.enums.SubjectStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@IdClass(GradeId.class)
@Table(name = "grades")
@AllArgsConstructor
@NoArgsConstructor
public class Grade {
    @Id
    @ManyToOne
    @JoinColumn(name = "subject_code", referencedColumnName = "code", nullable = false)
    private Subject subject;

    @Id
    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "id", nullable = false)
    private Student student;

    @Id
    @Column(nullable = false)
    private Integer period;

    @Column(nullable = false)
    private Double finalGrade;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SubjectStatus subjectStatus;
}