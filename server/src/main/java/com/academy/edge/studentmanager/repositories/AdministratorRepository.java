package com.academy.edge.studentmanager.repositories;

import com.academy.edge.studentmanager.models.Administrator;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministratorRepository extends CrudRepository<Administrator, String> {
    Optional<Administrator> findByEmail(String email);

    boolean existsByEmail(String email);

    void deleteByEmail(String email);
}
