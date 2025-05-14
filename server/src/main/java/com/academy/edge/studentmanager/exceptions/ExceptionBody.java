package com.academy.edge.studentmanager.exceptions;


import lombok.Data;
import java.util.List;

@Data
public class ExceptionBody {
    private List<String> messages;
    private int statusCode;

    public ExceptionBody(String message, int statusCode){
        this.messages = List.of(message);
        this.statusCode = statusCode;
    }

    public ExceptionBody(List<String> messages, int statusCode){
        this.messages = messages;
        this.statusCode = statusCode;
    }
}