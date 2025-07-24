package com.academy.edge.studentmanager.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthMeResponseDTO {
    private String id;
    private String name;
    private String email;
    private String photoUrl;
    private String dtype;
}
