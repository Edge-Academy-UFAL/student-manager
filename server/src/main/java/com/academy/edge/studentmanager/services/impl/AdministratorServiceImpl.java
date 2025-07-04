package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.configs.ApplicationProperties;
import com.academy.edge.studentmanager.dtos.*;
import com.academy.edge.studentmanager.enums.InvitationErrorType;
import com.academy.edge.studentmanager.models.Administrator;
import com.academy.edge.studentmanager.models.Student;
import com.academy.edge.studentmanager.repositories.AdministratorRepository;
import com.academy.edge.studentmanager.services.AdministratorService;
import com.academy.edge.studentmanager.services.EmailService;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.RandomStringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.core.io.ResourceLoader;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.HtmlUtils;

import java.util.ArrayList;
import java.util.List;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Log4j2
@Service
public class AdministratorServiceImpl implements AdministratorService {

    private final AdministratorRepository administratorRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationProperties applicationProperties;
    private final String invitationEmailTemplate;
    final private ModelMapper modelMapper;

    public AdministratorServiceImpl(
            AdministratorRepository administratorRepository,
            EmailService emailService,
            PasswordEncoder passwordEncoder,
            ApplicationProperties applicationProperties,
            ResourceLoader resourceLoader,
            ModelMapper modelMapper
    ) throws IOException {
        this.administratorRepository = administratorRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
        this.applicationProperties = applicationProperties;
        this.modelMapper =  modelMapper;

        var resource = resourceLoader.getResource("classpath:emails/admin-invitation.html");
        this.invitationEmailTemplate = resource.getContentAsString(StandardCharsets.UTF_8);
    }

    @Override
    @Transactional
    public InvitationErrorDTO register(String name, String email) {
        if (this.administratorRepository.existsByEmail(email)) {
            return new InvitationErrorDTO(InvitationErrorType.ALREADY_REGISTERED, null);
        }

        var administrator = new Administrator();
        var password = RandomStringUtils.secureStrong().nextPrint(16);
        administrator.setName(name);
        administrator.setEmail(email);
        administrator.setPassword(this.passwordEncoder.encode(password));

        try {
            this.administratorRepository.save(administrator);
            this.emailService.sendEmail(email, "Bem vindo ao Academy!", this.constructHtmlMessageText(password));
        } catch (Exception e) {
            log.error("Failed to send invitation email", e);
            return new InvitationErrorDTO(InvitationErrorType.SMTP_ERROR, e.getMessage());
        }

        return null;
    }

    @Override
    public List<AdministratorResponseDTO> getAdministrators() {
        List<AdministratorResponseDTO> administrators = new ArrayList<>();
        this.administratorRepository.findAll().forEach(administrator -> administrators.add(modelMapper.map(administrator, AdministratorResponseDTO.class)));
        return administrators;
    }

    @Override
    public AdministratorResponseDTO getAdministratorByEmail(String email) {
        Administrator administrator = administratorRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Administrator not found"));
        return modelMapper.map(administrator, AdministratorResponseDTO.class);
    }

    @Override
    public AdministratorResponseDTO updateAdministrator(String email, AdministratorUpdateDTO administratorUpdateDTO) {
        Administrator administrator = administratorRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Administrator not found with email: " + email));

        modelMapper.map(administratorUpdateDTO, administrator);
        administratorRepository.save(administrator);

        return modelMapper.map(administrator, AdministratorResponseDTO.class);
    }

    @Override
    public void deleteAdministrator(String email) {
        Administrator administrator = administratorRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Administrator not found"));
        administrator.setDeleted(true);
        administratorRepository.save(administrator);
    }

    private String constructHtmlMessageText(String password) {
        var url = this.applicationProperties.frontendUrl();
        password = HtmlUtils.htmlEscape(password, "UTF-8");
        return this.invitationEmailTemplate.replace("[[URL]]", url).replace("[[PASSWORD]]", password);
    }
}
