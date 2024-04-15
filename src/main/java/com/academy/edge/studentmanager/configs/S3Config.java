package com.academy.edge.studentmanager.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.AmazonS3Exception;

@Configuration
public class S3Config {

    @Value("${aws.access.key}")
    private String awsAccessKey;

    @Value("${aws.secret.key}")
    private String awsSecretKey;

    @Value("${aws.url}")
    private String awsUrl;

    @Bean
    public AmazonS3 s3client(){
        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(awsAccessKey,awsSecretKey);
        var awsS3Config = AmazonS3ClientBuilder.standard()
                .withEndpointConfiguration(new AmazonS3ClientBuilder.EndpointConfiguration(awsUrl, Regions.US_EAST_1.getName()))
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
        return awsS3Config;
    }
}
