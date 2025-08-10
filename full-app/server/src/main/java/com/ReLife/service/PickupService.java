package com.ReLife.service;

import java.util.List;
import java.util.stream.Collectors;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Service;

import com.ReLife.dto.PickupRequestDto;
import com.ReLife.mapper.PickupMapper;
import com.ReLife.model.Pickup;
import com.ReLife.repository.PickupRepository;

@Service
public class PickupService {
  private static final String SCHEDULED = "Scheduled";
  private final PickupRepository repo;
  private final PickupMapper mapper;

  public PickupService(PickupRepository repo, PickupMapper mapper) {
    this.repo = repo;
    this.mapper = mapper;
  }

  public PickupRequestDto create(PickupRequestDto dto) {

    Pickup pickup = mapper.toEntity(dto);
    pickup.setStatus(SCHEDULED);
    Pickup saved = repo.save(pickup);
    sanitizeInput(saved);
    return mapper.toDto(saved);
  }
  
  public List<PickupRequestDto> findAllDtos() {
      List<Pickup> pickups = repo.findAll();
      pickups.forEach(this::sanitizeInput);
      return pickups.stream()
              .map(mapper::toDto)
              .collect(Collectors.toList());
  }


  private void sanitizeInput(Pickup pickup) {
      pickup.setDevice(Jsoup.clean(pickup.getDevice(), Safelist.basic()));
      pickup.setLocation(Jsoup.clean(pickup.getLocation(), Safelist.basic()));
  }
  
}