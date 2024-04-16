package com.academy.edge.studentmanager.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

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
    Timestamp createdAt;
}
