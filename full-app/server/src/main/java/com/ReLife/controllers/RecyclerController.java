package com.ReLife.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ReLife.dto.PickupRequestDto;
import com.ReLife.model.Pickup;
import com.ReLife.service.RecyclerService;

@RestController
@RequestMapping("/api/pickups")
@CrossOrigin(originPatterns = "*")
public class RecyclerController {

    private final RecyclerService recyclerService;

    public RecyclerController(RecyclerService recyclerService) {
        this.recyclerService = recyclerService;
    }

    @PostMapping("/")
    public ResponseEntity<Pickup> createPickup(@RequestBody PickupRequestDto dto) {
        return ResponseEntity.ok(recyclerService.createPickup(dto));
    }

    @GetMapping("/")
    public ResponseEntity<List<Pickup>> getAllPickups() {
        return ResponseEntity.ok(recyclerService.getAllPickups());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Pickup>> getPickupsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(recyclerService.getPickupsByStatus(status));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Pickup>> getPickupsByUser(@PathVariable String userId) {
        return ResponseEntity.ok(recyclerService.getPickupsByUser(userId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Pickup> updatePickupStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(recyclerService.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePickup(@PathVariable Long id) {
        recyclerService.deletePickup(id);
        return ResponseEntity.noContent().build();
    }
}