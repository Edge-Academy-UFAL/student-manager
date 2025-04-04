package com.academy.edge.studentmanager.services.impl;

import com.academy.edge.studentmanager.services.S3Service;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import java.io.IOException;

@Service
@Log4j2
public class S3ServiceImpl implements S3Service {

    private final AmazonS3 s3client;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    public S3ServiceImpl(AmazonS3 s3client) {
        this.s3client = s3client;
    }

    @PostConstruct
    public void init() {
        if (!s3client.doesBucketExistV2(bucketName)) {
            s3client.createBucket(bucketName);
            log.info("Bucket '{}' criado com sucesso!", bucketName);
        } else {
            log.info("Bucket '{}' já existe.", bucketName);
        }
    }

    @Override
    public void uploadFile(String keyName, MultipartFile file) throws IOException {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());

        s3client.putObject(bucketName, keyName, file.getInputStream(), metadata);
        log.info("Arquivo '{}' enviado para o bucket '{}'.", keyName, bucketName);
    }

    @Override
    public S3Object getFile(String keyName) {
        log.info("Buscando arquivo '{}' do bucket '{}'.", keyName, bucketName);
        return s3client.getObject(bucketName, keyName);
    }

    @Override
    public void deleteFile(String keyName) {
        s3client.deleteObject(bucketName, keyName);
        log.info("Arquivo '{}' deletado do bucket '{}'.", keyName, bucketName);
    }
}
