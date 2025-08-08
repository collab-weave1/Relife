package com.ReLife.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.nio.file.Files;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;

@Configuration
public class SigningKeyConfig {
  private static final String RSA = "RSA";

@Bean
  public PrivateKey signingKey() throws Exception {
    String pem = Files.readString(
      new ClassPathResource("keys/private.pem").getFile().toPath()
    );

    pem = pem
      .replace("-----BEGIN PRIVATE KEY-----", "")
      .replace("-----END PRIVATE KEY-----", "")
      .replaceAll("\\s", "");
    byte[] der = Base64.getDecoder().decode(pem);

    PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(der);
    return KeyFactory.getInstance(RSA).generatePrivate(spec);
  }
}