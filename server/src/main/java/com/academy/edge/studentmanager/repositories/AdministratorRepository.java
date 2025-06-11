package com.academy.edge.studentmanager.repositories;

import com.academy.edge.studentmanager.models.Administrator;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministratorRepository extends CrudRepository<Administrator, String> {
    boolean existsByEmail(String email);
}
