package com.academy.edge.studentmanager.exceptions;

public class MissingRequiredColumnsException extends RuntimeException {
    public MissingRequiredColumnsException(String message) {
        super(message);
    }
}
