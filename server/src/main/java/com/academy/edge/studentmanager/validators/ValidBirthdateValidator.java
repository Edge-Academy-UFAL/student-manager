package com.academy.edge.studentmanager.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;

public class ValidBirthdateValidator implements ConstraintValidator<ValidBirthdate, LocalDate> {
    @Override
    public boolean isValid(LocalDate value, ConstraintValidatorContext context) {
        return value != null && !value.isAfter(LocalDate.now());
    }
}
