package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.services.CsvReaderService;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.academy.edge.studentmanager.exceptions.MissingRequiredColumnsException;
import java.util.Set;
import java.util.stream.Collectors;

import java.io.InputStreamReader;
import java.io.Reader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.LinkedHashMap;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;



@Service
public class CsvReaderServiceImpl implements CsvReaderService {
    private static final List<String> REQUIRED_COLUMNS = List.of("nome", "cpf", "nascimento", "email", "telefone", "curso", "matricula", "turma", "nível");

    private boolean isValidCpfFormat(String cpf) {
        String digits = cpf.replaceAll("[^\\d]", "");
        return digits.matches("\\d{11}");
    }

    private boolean isValidEmail(String email) {
        return email.matches("^[\\w.-]+@[\\w.-]+\\.\\w{2,}$");
    }

    private boolean isValidPhone(String phone) {
        return phone.replaceAll("[^\\d]", "").matches("^\\d{11}$");
    }

    private boolean isValidDate(String date) {
        try {
            java.time.format.DateTimeFormatter formatter = java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy");
            java.time.LocalDate.parse(date, formatter);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Map<String, Object> readCsv(MultipartFile file) throws IOException {
        List<Map<String, String>> dataList = new ArrayList<>();
        List<Map<String, Object>> errorList = new ArrayList<>();

        try (Reader reader = new InputStreamReader(file.getInputStream())) {
            CSVParser parser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader());

            Set<String> headers = parser.getHeaderMap().keySet().stream()
                .map(String::toLowerCase)  // normaliza
                .collect(Collectors.toSet());
            
            List<String> missingColumns = REQUIRED_COLUMNS.stream()
                .filter(req -> !headers.contains(req))
                .toList();

            if (!missingColumns.isEmpty()) {
                throw new MissingRequiredColumnsException("Colunas obrigatórias ausentes: " + String.join(", ", missingColumns));
            }    

            int lineNum = 1;
            
            for (CSVRecord record : parser) {
                Map<String, String> rowMap = new LinkedHashMap<>();
                Map<String, String> fieldErrors = new LinkedHashMap<>();

                for (String header : record.toMap().keySet()) {
                    String value = record.get(header).trim();
                    String normalizedHeader = header.toLowerCase();

                    if ("cpf".equals(normalizedHeader)) {
                        if (!isValidCpfFormat(value)) {
                            fieldErrors.put("cpf", value);
                        }
                    }

                    if ("email".equals(normalizedHeader)) {
                        if (!isValidEmail(value)) {
                            fieldErrors.put("email", value);
                        }
                    }

                    if ("telefone".equals(normalizedHeader)) {
                        if (!isValidPhone(value)) {
                            fieldErrors.put("telefone", value);
                        }
                    }

                    if ("telefone2".equals(normalizedHeader)) {
                        if (!isValidPhone(value) && !value.isEmpty()) {
                            fieldErrors.put("telefone2", value);
                        }
                    }

                    if ("nascimento".equals(normalizedHeader)) {
                        if (!isValidDate(value)) {
                            fieldErrors.put("data de nascimento", value);
                        }
                    }

                    if ("entrada".equals(normalizedHeader)) {
                        if (!isValidDate(value)) {
                            fieldErrors.put("data de entrada", value);
                        }
                    }

                    rowMap.put(normalizedHeader, value);
                }

                if (!fieldErrors.isEmpty()) {
                    Map<String, Object> errorEntry = new LinkedHashMap<>();
                    errorEntry.put("linha", lineNum + 1); 
                    errorEntry.put("erros", fieldErrors);
                    errorList.add(errorEntry);
                } else {
                    dataList.add(rowMap);
                }

                lineNum++;
            }
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("imported", dataList);
        result.put("erros", errorList);
        result.put("total_imported", dataList.size());
        result.put("total_errors", errorList.size());

        return result;
    }
}
