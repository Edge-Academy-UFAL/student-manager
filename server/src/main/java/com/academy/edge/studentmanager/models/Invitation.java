package com.academy.edge.studentmanager.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "invitations")
public class Invitation {
    @Id
    @Column(nullable = false, updatable = false)
    private String email;

    @Column(nullable = false)
    private String code;

    @CreationTimestamp
    @Column()
    Instant createdAt;

    @Column(nullable = false)
    private int studentGroup;

    @Column(nullable = false)
    private LocalDate entryDate;
}
