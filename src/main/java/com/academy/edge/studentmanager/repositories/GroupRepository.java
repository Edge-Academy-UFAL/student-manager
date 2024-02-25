package com.academy.edge.studentmanager.repositories;


import com.academy.edge.studentmanager.models.Group;
import org.springframework.data.repository.CrudRepository;

public interface GroupRepository extends CrudRepository<Group, String> {
}
