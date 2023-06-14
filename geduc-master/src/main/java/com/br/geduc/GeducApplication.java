package com.br.geduc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class GeducApplication {

	public static void main(String[] args) {
		SpringApplication.run(GeducApplication.class, args);
	}

}
