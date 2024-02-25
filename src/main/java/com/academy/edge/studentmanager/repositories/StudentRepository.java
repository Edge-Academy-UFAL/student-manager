package com.academy.edge.studentmanager.repositories;

import com.academy.edge.studentmanager.models.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends CrudRepository<Student, String> {
}
