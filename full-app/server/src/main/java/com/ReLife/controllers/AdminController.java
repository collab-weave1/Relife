package com.ReLife.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ReLife.dto.AdminStatsDto;
import com.ReLife.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService service;
    public AdminController(AdminService service) { this.service = service; }

    @GetMapping("/stats")
    public AdminStatsDto getStats() {
        return service.getStats();
    }
}