package com.academy.edge.studentmanager.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GradeId implements Serializable {
    private Subject subject;
    private Student student;
    private Integer period;
}
