package com.academy.edge.studentmanager.repositories;

import com.academy.edge.studentmanager.models.User;
import org.springframework.data.repository.Repository;

public interface UserRepository extends Repository<User, String> {
    User findByEmail(String email);
}
