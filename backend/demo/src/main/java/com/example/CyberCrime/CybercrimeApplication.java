package com.example.CyberCrime;

import org.springframework.aop.scope.ScopedProxyUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CybercrimeApplication {

	public static void main(String[] args) {
		SpringApplication.run(CybercrimeApplication.class, args);
	}
	System.out.println("hello world");
}
