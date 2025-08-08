package com.ReLife.service;

import org.springframework.stereotype.Service;

import com.ReLife.dto.AdminStatsDto;
import com.ReLife.repository.AdminStatsRepository;

@Service
public class AdminService {

	private final AdminStatsRepository adminStatsRepository;

	public AdminService(AdminStatsRepository adminStatsRepository) {
		this.adminStatsRepository = adminStatsRepository;
	}

	public AdminStatsDto getStats() {
		return adminStatsRepository.fetchDashboardStats();
	}
}