package com.academy.edge.studentmanager.repositories;

import com.academy.edge.studentmanager.models.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, String> {
    Optional<Subject> findSubjectByCode(String code);
}
