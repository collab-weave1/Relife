package com.ReLife.model;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BadgeEvent {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Long userId;
	private String badgeKey;
	private Instant timestamp;

	// the hash H_n = H(H_{n-1} ∥ badgeKey ∥ timestamp)
	@Column(length = 64)
	private String chainHash;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getBadgeKey() {
		return badgeKey;
	}

	public void setBadgeKey(String badgeKey) {
		this.badgeKey = badgeKey;
	}

	public Instant getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Instant timestamp) {
		this.timestamp = timestamp;
	}

	public String getChainHash() {
		return chainHash;
	}

	public void setChainHash(String chainHash) {
		this.chainHash = chainHash;
	}

	@Override
	public String toString() {
		return "BadgeEvent [id=" + id 
				+ ", userId=" + userId 
				+ ", badgeKey=" + badgeKey 
				+ ", timestamp=" + timestamp
				+ ", chainHash=" + chainHash 
				+ "]";
	}

}