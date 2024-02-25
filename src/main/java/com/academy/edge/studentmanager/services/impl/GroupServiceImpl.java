package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.models.Group;
import com.academy.edge.studentmanager.repositories.GroupRepository;
import com.academy.edge.studentmanager.services.GroupService;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class GroupServiceImpl implements GroupService {
    final private GroupRepository groupRepository;

    public GroupServiceImpl(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @Override
    public List<Group> getGroups() {
        List<Group> groups = new ArrayList<>();
        this.groupRepository.findAll().forEach(groups::add);
        return groups;
    }

    @Override
    public Group getGroupByID(String id) {
        return this.groupRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Group not found"));
    }

    @Override
    public Group insertGroup(Group group) {
        return this.groupRepository.save(group);
    }

    @Override
    public Group updateGroup(Group group, String id) {
        Group actualGroup = this.getGroupByID(id);

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
