package com.academy.edge.studentmanager.dtos;

import com.academy.edge.studentmanager.enums.ActivityType;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
public class ActivityResponseDTO {

    private String activityId;
    private ActivityType activityType;
    private String name;
    private String description;
    private int workShift;
    private Date startDate;
    private Date conclusionDate;
    private boolean onGoing;
    private boolean isPaid;

}
