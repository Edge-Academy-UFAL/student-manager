package com.academy.edge.studentmanager.models;

import com.academy.edge.studentmanager.enums.Course;
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

    @Column(nullable = false)
    private Date entryDate;

    @Override
    public String getDtype() {
        return "Student";
    }

    @Override
    public boolean isEnabled(){
        return false;
    }

    @Column(name = "terminationReason")
    private String terminationReason;
}
