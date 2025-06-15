package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.InvitationErrorDTO;

public interface AdministratorService {
    InvitationErrorDTO register(String name, String email);
}
