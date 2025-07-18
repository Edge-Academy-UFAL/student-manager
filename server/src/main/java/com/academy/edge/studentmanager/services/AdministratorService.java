package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.AdministratorResponseDTO;
import com.academy.edge.studentmanager.dtos.AdministratorUpdateDTO;

import java.util.List;

public interface AdministratorService {
    void register(String name, String email);

    List<AdministratorResponseDTO> getAdministrators();

    AdministratorResponseDTO getAdministratorByEmail(String email);

    AdministratorResponseDTO updateAdministrator(String email, AdministratorUpdateDTO administratorUpdateDTO);

    void deleteAdministrator(String email);
}