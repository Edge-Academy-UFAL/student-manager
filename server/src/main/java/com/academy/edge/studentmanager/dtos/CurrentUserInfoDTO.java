package com.academy.edge.studentmanager.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CurrentUserInfoDTO {
    @NotBlank
    private String id;

    @NotBlank
    private String name;

    @NotBlank
    private String email;

    // Can be null
    private String photoUrl;

    @NotBlank
    private String dtype;
}
