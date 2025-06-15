package com.academy.edge.studentmanager.repositories;

import com.academy.edge.studentmanager.models.User;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface UserRepository extends Repository<User, String> {
    Optional<User> findByEmail(String email);
    void save(User user);
}
