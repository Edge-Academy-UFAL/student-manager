package com.academy.edge.studentmanager.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="tasks")
public class Task{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
}