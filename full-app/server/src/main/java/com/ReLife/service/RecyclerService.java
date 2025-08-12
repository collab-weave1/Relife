package com.ReLife.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ReLife.dto.PickupRequestDto;
import com.ReLife.model.Pickup;
import com.ReLife.repository.PickupRepository;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class RecyclerService {

    private final PickupRepository pickupRepository;

    public RecyclerService(PickupRepository pickupRepository) {
        this.pickupRepository = pickupRepository;
    }
    
    @PostConstruct
    public void seedData() {
        if (pickupRepository.count() == 0) {
            List<PickupRequestDto> pickupDtos = Arrays.asList(
                createPickupDto("1", "Smart TV", "Samsung", "Koramangala", "2024-06-15", "Waiting", 2800),
                createPickupDto("2", "Laptop", "Dell", "Whitefield", "2024-06-18", "In Progress", 3200),
                createPickupDto("3", "iPhone", "Apple", "Indiranagar", "2024-06-20", "Completed", 1500),
                createPickupDto("4", "Tablet", "iPad", "HSR Layout", "2024-06-22", "Waiting", 1800)
            );

            pickupDtos.forEach(this::createPickup);
        }
    }

    private PickupRequestDto createPickupDto(String userId, String device, String brand, String location, String submittedDate, String status, int value) {
        PickupRequestDto dto = new PickupRequestDto();
        dto.setUserId(userId);
        dto.setDevice(device);
        dto.setBrand(brand);
        dto.setLocation(location);
        dto.setPreferredTime(submittedDate);
        dto.setStatus(status);
        dto.setValue(Double.valueOf(value));
        dto.setSubmittedDate(submittedDate);
        return dto;
    }

    public Pickup createPickup(PickupRequestDto dto) {
        Pickup pickup = new Pickup();
        pickup.setUserId(dto.getUserId());
        pickup.setDevice(dto.getDevice());
        pickup.setBrand(dto.getBrand());
        pickup.setLocation(dto.getLocation());
        pickup.setPreferredTime(dto.getPreferredTime());
        pickup.setStatus(dto.getStatus());
        pickup.setSubmittedDate(dto.getSubmittedDate());
        pickup.setValue(dto.getValue());
        return pickupRepository.save(pickup);
    }

    public List<Pickup> getAllPickups() {
        return pickupRepository.findAll();
    }

    public List<Pickup> getPickupsByStatus(String status) {
        return pickupRepository.findByStatus(status);
    }

    public List<Pickup> getPickupsByUser(String userId) {
    	boolean exists = pickupRepository.existsByUserId(userId);
    	
    	if(!exists) {
			return Collections.emptyList();
    	}
        return pickupRepository.findByUserId(userId);
    }

    public Pickup updateStatus(Long id, String status) {
        Pickup pickup = pickupRepository.findById(id).orElseThrow(() -> new RuntimeException("Pickup not found"));
        pickup.setStatus(status);
        return pickupRepository.save(pickup);
    }

    public void deletePickup(Long id) {
        pickupRepository.deleteById(id);
    }
}