package com.academy.edge.studentmanager.repositories;

import com.academy.edge.studentmanager.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, String> {
    Optional<User> findByEmail(String email);
}
