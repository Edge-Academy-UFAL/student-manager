package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.services.ExcelReaderService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.academy.edge.studentmanager.exceptions.MissingRequiredColumnsException;


import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Iterator;
import java.util.LinkedHashMap;

@Service
public class ExcelReaderServiceImpl implements ExcelReaderService {
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
    public Map<String, Object> readExcel(MultipartFile file) {
        List<Map<String, String>> dataList = new ArrayList<>();
        List<Map<String, Object>> errorList = new ArrayList<>();

        try (InputStream inputStream = file.getInputStream(); Workbook workbook = new XSSFWorkbook(inputStream)) {

            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();

            List<String> headers = new ArrayList<>();

            if (rowIterator.hasNext()) {
                Row headerRow = rowIterator.next();
                for (Cell cell : headerRow) {
                    cell.setCellType(CellType.STRING);
                    headers.add(cell.getStringCellValue().trim().toLowerCase());
                }

                List<String> missing = new ArrayList<>();
                for (String required : REQUIRED_COLUMNS) {
                    if (!headers.contains(required)) {
                        missing.add(required);
                    }
                }

                if (!missing.isEmpty()) {
                    throw new MissingRequiredColumnsException("Colunas obrigatórias ausentes: " + String.join(", ", missing));

                }
            }

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                Map<String, String> rowMap = new LinkedHashMap<>();
                Map<String, String> fieldErrors = new LinkedHashMap<>();
                
                int numCols = headers.size();
                for (int colIdx = 0; colIdx < numCols; colIdx++) {
                    Cell cell = row.getCell(colIdx, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
                    String header = headers.get(colIdx);
                    
                    String value;
                    if (cell.getCellType() == CellType.NUMERIC) {
                        if (DateUtil.isCellDateFormatted(cell)) {
                            java.util.Date date = cell.getDateCellValue();
                            java.text.SimpleDateFormat dateFormat = new java.text.SimpleDateFormat("dd/MM/yyyy");
                            value = dateFormat.format(date);
                        } else {
                            value = new java.math.BigDecimal(cell.getNumericCellValue()).toPlainString().trim();
                        }
                    } else {
                        cell.setCellType(CellType.STRING);
                        value = cell.getStringCellValue().trim();
                    }

                    if ("cpf".equals(header)) {
                        if (!isValidCpfFormat(value)) {
                            fieldErrors.put("cpf", value);
                        }
                    }

                    if ("email".equals(header)) {
                        if (!isValidEmail(value)) {
                            fieldErrors.put("email", value);
                        }
                    }

                    if ("telefone".equals(header)) {
                        if (!isValidPhone(value)) {
                            fieldErrors.put("telefone", value);
                        }
                    }

                    if ("telefone2".equals(header)) {
                        if (!isValidPhone(value) && !value.isEmpty()) {
                            fieldErrors.put("telefone2", value);
                        }
                    }
                    
                    if ("nascimento".equals(header)) {
                        if (!isValidDate(value)) {
                            fieldErrors.put("data de nascimento", value);
                        }
                    }

                    if ("entrada".equals(header)) {
                        if (!isValidDate(value)) {
                            fieldErrors.put("data de entrada", value);
                        }
                    }

                    rowMap.put(header, value);
                }
                
                if (!fieldErrors.isEmpty()) {
                    Map<String, Object> errorEntry = new LinkedHashMap<>();
                    errorEntry.put("linha", row.getRowNum() + 1);
                    errorEntry.put("erros", fieldErrors);
                    errorList.add(errorEntry);
                } else {
                    dataList.add(rowMap);
                }

            }

        } catch (Exception e) {
            throw new RuntimeException("Erro ao ler o arquivo Excel: " + e.getMessage(), e);
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("imported", dataList);
        result.put("erros", errorList);
        result.put("total_imported", dataList.size());
        result.put("total_errors", errorList.size());

        return result;
    }

}
