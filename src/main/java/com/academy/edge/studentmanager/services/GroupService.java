package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.models.Group;

import java.util.List;

public interface GroupService {
    List<Group> getGroups();
    Group getGroupByID(String id);
    Group insertGroup(Group group);
    Group updateGroup(Group group, String id);
    void deleteGroup(String id);
}
