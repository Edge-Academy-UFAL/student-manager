package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.GroupCreateDTO;
import com.academy.edge.studentmanager.dtos.GroupResponseDTO;
import com.academy.edge.studentmanager.models.Group;
import com.academy.edge.studentmanager.services.GroupService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/groups")
public class GroupController {
    final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping
    public ResponseEntity<List<GroupResponseDTO>> getAllGroups() {
        return new ResponseEntity<>(groupService.getGroups(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroupResponseDTO> getGroup(@PathVariable String id) {
        return new ResponseEntity<>(groupService.getGroupByID(id), HttpStatus.OK);
    }

    //@PreAuthorize("hasAnyRole('ADMIN','INSTRUCTOR')")
    @PostMapping
    public ResponseEntity<GroupResponseDTO> saveGroup(@Valid @RequestBody GroupCreateDTO groupCreateDTO) {
        return new ResponseEntity<>(groupService.insertGroup(groupCreateDTO), HttpStatus.CREATED);
    }

    // TODO: Atualizar esta classe para DTO
    // Tirar dúvida quanto ao funcionamento do DTO para updates
    @PreAuthorize("hasAnyRole('ADMIN','INSTRUCTOR')")
    @PutMapping("/{id}")
    public ResponseEntity<Group> updateGroup(@RequestBody Group group, @PathVariable String id) {
        return new ResponseEntity<>(groupService.updateGroup(group, id), HttpStatus.OK);
    }

    //@PreAuthorize("hasAnyRole('ADMIN','INSTRUCTOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable String id) {
        groupService.deleteGroup(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
