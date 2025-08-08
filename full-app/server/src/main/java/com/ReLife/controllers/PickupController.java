package com.ReLife.controllers;


import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ReLife.dto.PickupRequestDto;
import com.ReLife.service.PickupService;

@RestController
@RequestMapping("/api/pickup")
public class PickupController {
  private final PickupService service;
  public PickupController(PickupService service) { this.service = service; }

  @PostMapping("/schedule")
  public ResponseEntity<PickupRequestDto> schedule(
      @Valid @RequestBody PickupRequestDto dto) {
    PickupRequestDto created = service.create(dto);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  @GetMapping("/all")
  public ResponseEntity<?> getAll() {
    return ResponseEntity.ok(service.findAllDtos());
  }
 
}