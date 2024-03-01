package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.dtos.GroupCreateDTO;
import com.academy.edge.studentmanager.dtos.GroupResponseDTO;
import com.academy.edge.studentmanager.models.Group;
import com.academy.edge.studentmanager.repositories.GroupRepository;
import com.academy.edge.studentmanager.services.GroupService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class GroupServiceImpl implements GroupService {
    final private GroupRepository groupRepository;
    final ModelMapper modelMapper;

    @Autowired
    public GroupServiceImpl(GroupRepository groupRepository, ModelMapper modelMapper) {
        this.groupRepository = groupRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<GroupResponseDTO> getGroups() {
        List<GroupResponseDTO> groups = new ArrayList<>();
        this.groupRepository.findAll().forEach(group -> groups.add(modelMapper.map(group, GroupResponseDTO.class)));
        return groups;
    }

    @Override
    public GroupResponseDTO getGroupByID(String id) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Group not found"));
        return modelMapper.map(group, GroupResponseDTO.class);
    }

    @Override
    public GroupResponseDTO insertGroup(GroupCreateDTO groupCreateDTO) {
        Group group = groupRepository.save(modelMapper.map(groupCreateDTO, Group.class));
        return modelMapper.map(group, GroupResponseDTO.class);
    }

    // FIXME: Atualizar esta classe para DTO
    // Tirar dúvida quanto ao funcionamento do DTO para updates
    @Override
    public Group updateGroup(Group group, String id) {
        // FIXME: Validar se isso é correto
        Group actualGroup = modelMapper.map(getGroupByID(id), Group.class);

        actualGroup.setName(group.getName());
        actualGroup.setDescription(group.getDescription());
        actualGroup.setType(group.getType());

        return this.groupRepository.save(actualGroup);
    }

    @Override
    public void deleteGroup(String id) {
        this.groupRepository.deleteById(id);
    }
}
