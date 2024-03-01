package com.academy.edge.studentmanager.repositories;

import com.academy.edge.studentmanager.models.Instructor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InstructorRepository extends CrudRepository<Instructor, String> {
    Optional<Instructor> findByEmail(String email);
}
