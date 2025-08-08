package com.ReLife.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ReLife.dto.AdminStatsDto;
import com.ReLife.model.AdminStats;

@Repository
public interface AdminStatsRepository extends CrudRepository<AdminStats, Long> {

    @Query("SELECT new com.ReLife.dto.AdminStatsDto(" +
            "SUM(e.weight), COUNT(DISTINCT e.brand), COUNT(DISTINCT r.id), COUNT(DISTINCT u.id), " +
            "SUM(e.co2Saved), COUNT(m.id)) " +
            "FROM EWasteRecord e " +
            "JOIN e.recycler r " +
            "JOIN e.user u " +
            "JOIN MarketplaceItem m")
    AdminStatsDto fetchDashboardStats();

}
