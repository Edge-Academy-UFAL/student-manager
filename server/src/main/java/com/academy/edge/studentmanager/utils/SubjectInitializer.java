package com.academy.edge.studentmanager.utils;

import com.academy.edge.studentmanager.models.Subject;
import com.academy.edge.studentmanager.repositories.SubjectRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Component
public class SubjectInitializer implements CommandLineRunner {
    private final SubjectRepository subjectRepository;

    private final ObjectMapper objectMapper;

    public SubjectInitializer(ObjectMapper objectMapper, SubjectRepository subjectRepository) {
        this.objectMapper = objectMapper;
        this.subjectRepository = subjectRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if(subjectRepository.count() > 0) {
            return;
        }

        InputStream inputStream = null;
        try {
            ClassPathResource resource = new ClassPathResource("data/subjects.json");
            inputStream = resource.getInputStream();
            List<Subject> subjects = new ArrayList<>();

            JsonNode rootNode = objectMapper.readTree(inputStream);

            for (JsonNode node : rootNode) {
                String code = node.get(0).asText();
                String name = node.get(1).asText();
                int workload = node.get(2).asInt();
                subjects.add(new Subject(code, name, workload));
            }
            subjectRepository.saveAll(subjects);
        }
        catch (IOException e) {
            System.out.println("Error loading subjects.json");
            System.out.println(e.getMessage());
        }
        finally {
            if(inputStream != null){
                try{
                    inputStream.close();
                }
                catch (IOException e){
                    System.out.println("Error closing input stream");
                }
            }
        }
    }
}
