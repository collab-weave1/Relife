package com.ReLife.controllers;

import org.springframework.boot.actuate.health.Health;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/warmup")
public class WarmupController {

    /**
     * Ping this endpoint to warm-up the app.
     */
    @GetMapping("/")
    public Health warmup() { 
//    	 boolean warmed = warmed.get();
         return Health.up()
//        		 .withDetail("warmed", warmed)
        		 .build();
    }
}
