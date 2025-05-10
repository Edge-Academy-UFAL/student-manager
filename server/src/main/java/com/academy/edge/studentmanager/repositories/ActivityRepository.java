package com.academy.edge.studentmanager.repositories;

import com.academy.edge.studentmanager.models.Activity;
import com.academy.edge.studentmanager.models.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends CrudRepository <Activity,String> {

    List<Activity> findAllByStudent(Student student);

    void deleteActivityById(String activityId);
}
