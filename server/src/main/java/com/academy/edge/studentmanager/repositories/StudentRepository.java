package com.academy.edge.studentmanager.repositories;

import com.academy.edge.studentmanager.models.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends CrudRepository<Student, String> {
    Optional<Student> findByEmail(String email);

    void deleteByEmail(String email);
}
