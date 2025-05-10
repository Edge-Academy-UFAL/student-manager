package com.academy.edge.studentmanager.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "subjects")
@NoArgsConstructor
@AllArgsConstructor
public class Subject {
    @Id
    @Column(updatable = false, nullable = false)
    private String code;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer workload;
}
