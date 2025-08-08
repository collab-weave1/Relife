package com.ReLife.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ReLife.model.BadgeEvent;

@Repository
public interface BadgeEventRepository extends JpaRepository<BadgeEvent, Long> {
	
	  List<BadgeEvent> findByUserIdOrderByTimestamp(Long userId);

	  Optional<BadgeEvent> findTopByUserIdOrderByTimestampDesc(Long userId);

}
