package com.academy.edge.studentmanager.models;

import com.academy.edge.studentmanager.enums.GroupType;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;


@Entity
@Data
@Table(name="groups")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column
    private String description;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private GroupType type;


    @ManyToMany(mappedBy = "memberGroups")
    Set<Student> members;

}
