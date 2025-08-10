package com.ReLife.service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Service;

import com.ReLife.model.BadgeEvent;
import com.ReLife.repository.BadgeEventRepository;

@Service
public class BadgeService {
    private final BadgeEventRepository repo;

    public BadgeService(BadgeEventRepository repo) {
        this.repo = repo;
    }

    public List<BadgeEvent> getEventsForUser(Long userId) {
        return repo.findByUserIdOrderByTimestamp(userId);
    }

    public Optional<BadgeEvent> getLatestEvent(Long userId) {
        return repo.findTopByUserIdOrderByTimestampDesc(userId);
    }

    public BadgeEvent awardBadge(Long userId, String badgeKey) {
        BadgeEvent last = repo.findTopByUserIdOrderByTimestampDesc(userId).orElse(null);
        String prevHash = (last == null ? "" : last.getChainHash());

        Instant now = Instant.now();
        String concatenated = prevHash + "|" + badgeKey + "|" + now;
        String newHash = DigestUtils.sha256Hex(concatenated);

        BadgeEvent ev = new BadgeEvent();
        ev.setUserId(userId);
        ev.setBadgeKey(badgeKey);
        ev.setTimestamp(now);
        ev.setChainHash(newHash);
        return repo.save(ev);
    }
}