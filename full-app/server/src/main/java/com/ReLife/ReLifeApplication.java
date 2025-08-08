package com.ReLife;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ReLifeApplication {
    public static void main(String[] args) {
        SpringApplication.run(ReLifeApplication.class, args);
    }
}