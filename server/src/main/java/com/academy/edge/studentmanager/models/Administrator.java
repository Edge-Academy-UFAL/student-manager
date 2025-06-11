package com.academy.edge.studentmanager.models;

import com.academy.edge.studentmanager.enums.Role;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Collections;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "administrators")
@PrimaryKeyJoinColumn(name = "id")
@NoArgsConstructor
public class Administrator extends User {
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + Role.ADMIN.name()));
    }

    @Override
    public String getDtype() {
        return "Administrator";
    }
}
