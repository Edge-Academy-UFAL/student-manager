package com.academy.edge.studentmanager.models;

import com.academy.edge.studentmanager.enums.Course;
import com.academy.edge.studentmanager.enums.StudentStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.sql.Date;
import java.util.Set;

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

    // FIXME: Validar se isso é a maneira certa de se fazer
    @ManyToMany
    @JoinTable(
            name = "student_group_association",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id"))
    Set<Group> memberGroups;


}

