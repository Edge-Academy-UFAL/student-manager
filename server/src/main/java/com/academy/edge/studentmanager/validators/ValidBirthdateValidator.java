package com.academy.edge.studentmanager.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.DateTimeException;
import java.time.LocalDate;

public class ValidBirthdateValidator implements ConstraintValidator<ValidBirthdate, String>{
    @Override
    public void initialize(ValidBirthdate constraintAnnotation) {

    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(value == null){
            return false;
        }

        try{
            LocalDate currentDate = LocalDate.now();
            LocalDate date = LocalDate.parse(value);

            return !date.isAfter(currentDate);
        }
        catch(DateTimeException e){
            return false;
        }
    }
}
