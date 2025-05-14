package com.academy.edge.studentmanager.services;

import com.academy.edge.studentmanager.dtos.ActivityDeleteDTO;
import com.academy.edge.studentmanager.dtos.ActivityResponseDTO;
import com.academy.edge.studentmanager.dtos.ActivityCreateDTO;
import com.academy.edge.studentmanager.dtos.ActivityUpdateDTO;

import java.util.List;

public interface ActivityService {

    List<ActivityResponseDTO> getAllActivities(String email);

    ActivityResponseDTO saveActivity(ActivityCreateDTO activityCreateDTO);

    ActivityResponseDTO updateActivity(ActivityUpdateDTO activityUpdateDTO);

    void deleteActivity(ActivityDeleteDTO activityDeleteDTO);
}
