package com.academy.edge.studentmanager.models;

import com.academy.edge.studentmanager.enums.Course;
import com.academy.edge.studentmanager.enums.StudentStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.sql.Date;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "students")
@PrimaryKeyJoinColumn(name="id")
public class Student extends User{
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    Course course;

    @Column(nullable = false)
    String registration;

    @Column(nullable = false)
    int period = 1;

    @Column()
    String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    StudentStatus studentStatus = StudentStatus.ACTIVE;

    @Column(precision = 2)
    float coefficient;

    @Column()
    Date entryDate;
}
