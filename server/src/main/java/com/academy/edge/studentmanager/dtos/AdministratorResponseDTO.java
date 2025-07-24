package com.academy.edge.studentmanager.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdministratorResponseDTO {
    private String id;
    private String name;
    private String email;
    private String about;
    private String photoUrl;
}