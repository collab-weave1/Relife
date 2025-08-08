package com.ReLife.dto;

import java.time.Instant;

public record BadgeEventDTO(String badgeKey, Instant timestamp, String chainHash) {}