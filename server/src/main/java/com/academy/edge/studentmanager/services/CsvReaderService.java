package com.academy.edge.studentmanager.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface CsvReaderService {
    Map<String, Object> readCsv(MultipartFile file) throws Exception;
}
