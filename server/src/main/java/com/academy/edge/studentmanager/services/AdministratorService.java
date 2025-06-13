package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.InvitationErrorDTO;

public interface AdministratorService {
    InvitationErrorDTO register(String name, String email);

    List<AdministratorResponseDTO> getAdministrators()

    AdministratorResponseDTO getAdministratorByEmail(String email);

    AdministratorResponseDTO updateAdministrator(AdministratorUpdateDTO administratorUpdateDTO);

    void deleteAdministrator(AdministratorDeleteDTO administratorDeleteDTO);
}
