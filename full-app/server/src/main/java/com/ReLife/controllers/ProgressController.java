package com.ReLife.controllers;



import java.nio.charset.StandardCharsets;
import java.security.PrivateKey;
import java.security.Signature;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ReLife.dto.BadgeEventDTO;
import com.ReLife.model.BadgeEvent;
import com.ReLife.model.ProgressProof;
import com.ReLife.service.BadgeService;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {
  private static final String SHA_WITH_RSA = "SHA256withRSA";
private static final String BADGE_NOT_FOUND = "No badge events found";
private final BadgeService badgeService;
  private final PrivateKey signingKey;

  public ProgressController(BadgeService badgeService, PrivateKey signingKey) {
    this.badgeService = badgeService;
    this.signingKey   = signingKey;
  }

  @GetMapping("/{userId}")
  public ProgressProof getProof(@PathVariable Long userId) throws Exception {
	  List<BadgeEvent> events = badgeService.getEventsForUser(userId);
	  BadgeEvent latest = badgeService.getLatestEvent(userId)
	    .orElseThrow(() -> new Exception(BADGE_NOT_FOUND));
	  String rootHash = latest.getChainHash();

    Signature sig = Signature.getInstance(SHA_WITH_RSA);
    sig.initSign(signingKey);
    sig.update(rootHash.getBytes(StandardCharsets.UTF_8));
    String signature = Base64.getEncoder().encodeToString(sig.sign());

    List<BadgeEventDTO> dtos = events.stream()
      .map(e -> new BadgeEventDTO(e.getBadgeKey(), e.getTimestamp(), e.getChainHash()))
      .collect(Collectors.toList());

    return new ProgressProof(dtos, rootHash, signature);
  }
}