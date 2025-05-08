package com.academy.edge.studentmanager.models;

import com.academy.edge.studentmanager.enums.ActivityType;
import jakarta.persistence.*;
import lombok.Data;
import java.sql.Date;

@Entity
@Data
@Table(name = "activities")
public class Activity {
    public static final int MAX_ABOUT_LENGTH = 2600;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    String id;

    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    private Student student;

    @Enumerated(EnumType.STRING)
    @Column
    private ActivityType activityType;

    @Column(nullable = false, length = MAX_ABOUT_LENGTH)
    private String name;

    @Column(length = MAX_ABOUT_LENGTH)
    private String description;

    @Column(nullable = false)
    private int workShift;

    @Column(nullable = false)
    private Date startDate;

    @Column
    private Date conclusionDate;

    @Column(nullable = false)
    private boolean onGoing;

    @Column(nullable = false)
    private boolean isPaid;

}
