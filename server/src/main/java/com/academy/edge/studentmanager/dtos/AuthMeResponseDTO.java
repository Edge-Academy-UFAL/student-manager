package com.academy.edge.studentmanager.dtos;

import lombok.Data;

@Data
public class AuthMeResponseDTO {
    private String id;
    private String name;
    private String email;
    private String photoUrl;
    private String dtype;
}
