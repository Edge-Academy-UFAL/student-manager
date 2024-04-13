package com.academy.edge.studentmanager;

import com.academy.edge.studentmanager.services.S3Service;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Log4j2
@SpringBootApplication
public class StudentManagerApplication {

	@Bean
	public PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
	public static void main(String[] args) {
		SpringApplication.run(StudentManagerApplication.class, args);
	}
	@Bean
	public ApplicationRunner runner(S3Service s3Service){
		return args -> {
			log.info("Spring boot AWS S3 integration...");

			try {
				var s3Object = s3Service.getFile("jvm.png");
				log.info(s3Object.getKey());
			} catch (AmazonS3Exception e){
				log.error(e.getMessage());
			}
		};
	}


}
