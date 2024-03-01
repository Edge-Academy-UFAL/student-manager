package com.academy.edge.studentmanager.dtos;

import com.academy.edge.studentmanager.enums.GroupType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GroupResponseDTO {
    private String id;
    private String name;
    private String description;
    private GroupType type;
}
