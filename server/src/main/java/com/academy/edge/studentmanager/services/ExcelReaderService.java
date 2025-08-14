package com.academy.edge.studentmanager.services;

import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;

public interface ExcelReaderService {
    Map<String, Object> readExcel(MultipartFile file) throws Exception;
}
