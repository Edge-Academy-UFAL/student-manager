package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.dtos.ActivityCreateDTO;
import com.academy.edge.studentmanager.dtos.ActivityDeleteDTO;
import com.academy.edge.studentmanager.dtos.ActivityResponseDTO;
import com.academy.edge.studentmanager.dtos.ActivityUpdateDTO;
import com.academy.edge.studentmanager.models.Activity;
import com.academy.edge.studentmanager.models.Student;
import com.academy.edge.studentmanager.services.ActivityService;
import com.academy.edge.studentmanager.repositories.ActivityRepository;
import com.academy.edge.studentmanager.repositories.StudentRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@AllArgsConstructor
public class ActivityServiceImpl implements ActivityService {

    final ActivityRepository activityRepository;
    final StudentRepository studentRepository;
    final ModelMapper modelMapper;

    @Autowired
    public ActivityServiceImpl(ModelMapper modelMapper, ActivityRepository activityRepository, StudentRepository studentRepository)
    {
        this.activityRepository = activityRepository;
        this.studentRepository = studentRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ActivityResponseDTO> getAllActivities(String email) {
        Student student = studentRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found"));

        List<Activity> activities = activityRepository.findAllByStudent(student);

        return activities.stream()
                .map(activity -> modelMapper.map(activity, ActivityResponseDTO.class))
                .toList();
    }

    @Override
    @Transactional
    public ActivityResponseDTO saveActivity(ActivityCreateDTO activityCreateDTO) {
        Activity activity = modelMapper.map(activityCreateDTO, Activity.class);
        try{
            Student student = studentRepository
                    .findByEmail(activityCreateDTO.getStudentEmail())
                    .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found"));
            activity.setStudent(student);

            activityRepository.save(activity);
        }
        catch(Exception e){
            throw new RuntimeException(e);
        }

        return modelMapper.map(activity, ActivityResponseDTO.class);
    }

    @Override
    public ActivityResponseDTO updateActivity(ActivityUpdateDTO activityUpdateDTO) {
        Activity activity = activityRepository
                .findById(activityUpdateDTO.getActivityId())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Activity not found "));

        modelMapper.map(activityUpdateDTO, activity);
        activityRepository.save(activity);
        return modelMapper.map(activity, ActivityResponseDTO.class);
    }

    @Transactional
    public void deleteActivity(ActivityDeleteDTO activityDeleteDTO) {
        activityRepository.deleteActivityById(activityDeleteDTO.getActivityId());
    }

}
