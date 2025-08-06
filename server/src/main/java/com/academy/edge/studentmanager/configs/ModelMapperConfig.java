package com.academy.edge.studentmanager.configs;

import com.academy.edge.studentmanager.dtos.AdministratorResponseDTO;
import com.academy.edge.studentmanager.dtos.CurrentUserInfoDTO;
import com.academy.edge.studentmanager.dtos.StudentResponseDTO;
import com.academy.edge.studentmanager.models.Administrator;
import com.academy.edge.studentmanager.models.Student;
import com.academy.edge.studentmanager.models.User;
import com.academy.edge.studentmanager.services.S3Service;
import lombok.RequiredArgsConstructor;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class ModelMapperConfig {
    private final S3Service s3Service;

    @Bean
    public ModelMapper modelMapper() {
        var modelMapper = new ModelMapper();

        Converter<String, String> getFullS3Url = ctx -> {
            var src = ctx.getSource();
            return src == null || src.isEmpty() ? null : s3Service.getFileUrl(src);
        };

        modelMapper.createTypeMap(User.class, CurrentUserInfoDTO.class)
                .addMappings(m -> m.using(getFullS3Url).map(User::getPhotoUrl, CurrentUserInfoDTO::setPhotoUrl));

        modelMapper.createTypeMap(Administrator.class, AdministratorResponseDTO.class)
                .addMappings(m -> m.using(getFullS3Url)
                        .map(Administrator::getPhotoUrl, AdministratorResponseDTO::setPhotoUrl));

        modelMapper.createTypeMap(Student.class, StudentResponseDTO.class)
                .addMappings(m -> m.using(getFullS3Url).map(Student::getPhotoUrl, StudentResponseDTO::setPhotoUrl))
                .addMappings(m -> m.using(getFullS3Url)
                        .map(Student::getAcademicRecordUrl, StudentResponseDTO::setAcademicRecordUrl));

        return modelMapper;
    }
}
