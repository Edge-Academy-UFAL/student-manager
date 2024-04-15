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

    @Column
    private String birthdate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    Course course;

    @Column(nullable = false)
    String registration;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String secondaryPhone;

    @Column(nullable = false)
    int period = 1;

    @Column(nullable = false)
    private String entryPeriod;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    StudentStatus studentStatus = StudentStatus.ACTIVE;

    @Column()
    Date entryDate;
}
