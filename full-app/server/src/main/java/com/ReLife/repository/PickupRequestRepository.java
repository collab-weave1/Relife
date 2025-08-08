package com.ReLife.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ReLife.model.Pickup;

@Repository
public interface PickupRequestRepository extends JpaRepository<Pickup, Long> {}