package com.academy.edge.studentmanager.models;

import com.academy.edge.studentmanager.enums.InstructorSpecialization;
import com.academy.edge.studentmanager.enums.Role;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Collections;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "instructors")
@PrimaryKeyJoinColumn(name="id")
public class Instructor extends User{
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    InstructorSpecialization specialization;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_"+Role.INSTRUCTOR.name()));
    }
}
