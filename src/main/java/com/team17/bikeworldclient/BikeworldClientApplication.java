package com.team17.bikeworldclient;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@ComponentScan(basePackages = {"com.team17.bikeworldclient.controller"})
@SpringBootApplication
public class BikeworldClientApplication {

	public static void main(String[] args) {
		SpringApplication.run(BikeworldClientApplication.class, args);
	}
}
