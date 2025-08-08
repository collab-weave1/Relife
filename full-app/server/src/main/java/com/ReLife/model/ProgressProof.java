package com.ReLife.model;

import java.util.List;

import com.ReLife.dto.BadgeEventDTO;

public class ProgressProof {
  private List<BadgeEventDTO> events;
  private String rootHash;
  private String signature;

  public ProgressProof(List<BadgeEventDTO> events, String rootHash, String signature) {
    this.events = events;
    this.rootHash = rootHash;
    this.signature = signature;
  }

  public List<BadgeEventDTO> getEvents() {
    return events;
  }

  public void setEvents(List<BadgeEventDTO> events) {
    this.events = events;
  }

  public String getRootHash() {
    return rootHash;
  }

  public void setRootHash(String rootHash) {
    this.rootHash = rootHash;
  }

  public String getSignature() {
    return signature;
  }

  public void setSignature(String signature) {
    this.signature = signature;
  }
}
