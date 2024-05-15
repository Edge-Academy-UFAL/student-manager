package com.academy.edge.studentmanager.repositories;

import com.academy.edge.studentmanager.models.Grade;
import com.academy.edge.studentmanager.models.GradeId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GradeRepository extends CrudRepository<Grade, GradeId>{
    List<Grade> findGradeByStudentId(String studentId);
}
