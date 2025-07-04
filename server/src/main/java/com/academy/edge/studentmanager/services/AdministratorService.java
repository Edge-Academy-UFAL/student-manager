package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.*;

import java.util.List;

public interface AdministratorService {
    InvitationErrorDTO register(String name, String email);

    List<AdministratorResponseDTO> getAdministrators();

    AdministratorResponseDTO getAdministratorByEmail(String email);

    AdministratorResponseDTO updateAdministrator(String email, AdministratorUpdateDTO administratorUpdateDTO);

    void deleteAdministrator(String email);
}