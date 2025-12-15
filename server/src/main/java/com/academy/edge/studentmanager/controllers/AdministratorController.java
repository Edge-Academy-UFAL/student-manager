package com.academy.edge.studentmanager.controllers;

import com.academy.edge.studentmanager.dtos.*;
import com.academy.edge.studentmanager.services.AdministratorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@PreAuthorize("isAuthenticated()")
@RestController
@RequestMapping("/api/v1/administrators")
public class AdministratorController {

    private final AdministratorService administratorService;

    public AdministratorController(AdministratorService administratorService) {
        this.administratorService = administratorService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")   
    public ResponseEntity<Void> register(@Valid @RequestBody AdministratorCreateDTO requestDTO) {
        this.administratorService.register(requestDTO.getName(), requestDTO.getEmail());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AdministratorResponseDTO>> getAllAdministrators(){
        return new ResponseEntity<>(administratorService.getAdministrators(), HttpStatus.OK);
    }

    @GetMapping({"/{email}"})
    public ResponseEntity<AdministratorResponseDTO> getAdministrator(@PathVariable String email){
        return new ResponseEntity<>(administratorService.getAdministratorByEmail(email), HttpStatus.OK);
    }

    @PutMapping({"/{email}"})
    @PreAuthorize("hasAnyRole('ADMIN') or authentication.name == #email")
    public ResponseEntity<AdministratorResponseDTO> updateAdministratorByEmail(@PathVariable String email,
                                                     @RequestBody @Valid AdministratorUpdateDTO administratorUpdateDTO) {
        AdministratorResponseDTO administratorResponseDTO = administratorService.updateAdministrator(email, administratorUpdateDTO);

        return new ResponseEntity<>(administratorResponseDTO, HttpStatus.OK);
    }

    @DeleteMapping({"/{email}"})
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Void> deleteAdministrator(@PathVariable String email){
        administratorService.deleteAdministrator(email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}