package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.configs.ApplicationProperties;
import com.academy.edge.studentmanager.dtos.AdministratorResponseDTO;
import com.academy.edge.studentmanager.dtos.AdministratorUpdateDTO;
import com.academy.edge.studentmanager.models.Administrator;
import com.academy.edge.studentmanager.repositories.AdministratorRepository;
import com.academy.edge.studentmanager.services.AdministratorService;
import com.academy.edge.studentmanager.services.EmailService;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.RandomStringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.HtmlUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Log4j2
@Service
public class AdministratorServiceImpl implements AdministratorService {

    private final AdministratorRepository administratorRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationProperties applicationProperties;
    private final Resource invitationEmail;
    final private ModelMapper modelMapper;

    public AdministratorServiceImpl(
        AdministratorRepository administratorRepository,
        EmailService emailService,
        PasswordEncoder passwordEncoder,
        ApplicationProperties applicationProperties,
        @Value("classpath:emails/admin-invitation.html") Resource invitationEmail,
        ModelMapper modelMapper
    ) {
        this.administratorRepository = administratorRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
        this.applicationProperties = applicationProperties;
        this.invitationEmail = invitationEmail;
        this.modelMapper = modelMapper;
    }

    @Override
    @Transactional
    public void register(String name, String email) {
        if (this.administratorRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
        }

        var administrator = new Administrator();
        var password = RandomStringUtils.secureStrong().nextPrint(16);
        administrator.setName(name);
        administrator.setEmail(email);
        administrator.setPassword(this.passwordEncoder.encode(password));
        this.administratorRepository.save(administrator);

        try {
            this.sendInvitationEmail(email, password);
        } catch (Exception e) {
            log.error("Failed to send invitation email", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to send invitation email");
        }
    }

    @Override
    public List<AdministratorResponseDTO> getAdministrators() {
        List<AdministratorResponseDTO> administrators = new ArrayList<>();
        this.administratorRepository.findAll().forEach(administrator -> administrators.add(modelMapper.map(administrator, AdministratorResponseDTO.class)));
        return administrators;
    }

    @Override
    public AdministratorResponseDTO getAdministratorByEmail(String email) {
        var administrator = this.getAdministratorEntityByEmail(email);
        return modelMapper.map(administrator, AdministratorResponseDTO.class);
    }

    @Override
    @Transactional
    public AdministratorResponseDTO updateAdministrator(String email, AdministratorUpdateDTO administratorUpdateDTO) {
        var administrator = this.getAdministratorEntityByEmail(email);

        modelMapper.map(administratorUpdateDTO, administrator);
        administratorRepository.save(administrator);

        return modelMapper.map(administrator, AdministratorResponseDTO.class);
    }

    @Override
    @Transactional
    public void deleteAdministrator(String email) {
        var administrator = this.getAdministratorEntityByEmail(email);
        administrator.setDeleted(true);
        administratorRepository.save(administrator);
    }

    private Administrator getAdministratorEntityByEmail(String email) {
        return administratorRepository.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Administrator not found"));
    }

    private void sendInvitationEmail(String email, String password) throws MessagingException, IOException {
        var url = this.applicationProperties.frontendUrl();
        password = HtmlUtils.htmlEscape(password, "UTF-8");
        var replacements = Map.of("[[URL]]", url, "[[PASSWORD]]", password);
        this.emailService.sendEmailFromTemplate(email, "Bem vindo ao Academy!", this.invitationEmail, replacements);
    }
}
