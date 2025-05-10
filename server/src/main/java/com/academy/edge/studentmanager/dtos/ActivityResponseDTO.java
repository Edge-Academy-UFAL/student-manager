package com.academy.edge.studentmanager.dtos;

import com.academy.edge.studentmanager.enums.ActivityType;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class ActivityResponseDTO {

    private String activityId;
    private ActivityType activityType;
    private String name;
    private String description;
    private int workShift;
    private LocalDate startDate;
    private LocalDate conclusionDate;
    private boolean onGoing;
    private boolean isPaid;

}
