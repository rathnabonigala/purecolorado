package com.BMart;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication

@EnableJpaRepositories(basePackages = "com.BMart.repository")
@EntityScan(basePackages = "com.BMart.model")
public class BMartApplication {

	public static void main(String[] args) {
		SpringApplication.run(BMartApplication.class, args);
	}

}
