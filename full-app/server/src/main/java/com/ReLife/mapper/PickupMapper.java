package com.ReLife.mapper;

import org.mapstruct.Mapper;

import com.ReLife.dto.PickupRequestDto;
import com.ReLife.model.Pickup;

@Mapper(componentModel = "spring")
public interface PickupMapper {
  Pickup toEntity(PickupRequestDto dto);
  PickupRequestDto toDto(Pickup entity);
}