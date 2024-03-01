package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.GroupCreateDTO;
import com.academy.edge.studentmanager.dtos.GroupResponseDTO;
import com.academy.edge.studentmanager.models.Group;

import java.util.List;

public interface GroupService {
    List<GroupResponseDTO> getGroups();
    GroupResponseDTO getGroupByID(String id);
    GroupResponseDTO insertGroup(GroupCreateDTO groupCreateDTO);

    // FIXME: Atualizar esta classe para DTO
    // Tirar dúvida quanto ao funcionamento do DTO para updates
    Group updateGroup(Group group, String id);

    void deleteGroup(String id);
}
