package com.academy.edge.studentmanager.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SubjectResponseDTO {
    private String code;
    private String name;
    private Integer workload;
}
