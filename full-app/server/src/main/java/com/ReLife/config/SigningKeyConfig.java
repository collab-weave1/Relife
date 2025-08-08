package com.ReLife.config;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import com.ReLife.controllers.PaymentController;

@Configuration
public class SigningKeyConfig {
	
	private static final Logger logger = LoggerFactory.getLogger(SigningKeyConfig.class);

	private static final String RSA = "RSA";

	/**
	 * Path to the key. Default resolves to classpath:keys/private.pem You can
	 * override with an absolute filesystem path if you mount the key into the
	 * container: -Dsigning.key.path=/run/secrets/private.pem
	 */
	@Value("${signing.key.path:keys/private.pem}")
	private String keyPath;

	@Bean
	public PrivateKey signingKey() throws Exception {
		byte[] pemBytes = null;

		ClassPathResource classPathResource = new ClassPathResource(keyPath);
		if (classPathResource.exists()) {
			try (InputStream is = classPathResource.getInputStream()) {
				pemBytes = is.readAllBytes();
			}
		} else {
			Path fsPath = Path.of(keyPath);
			if (Files.exists(fsPath)) {
				pemBytes = Files.readAllBytes(fsPath);
			} else {
				logger.error("Private key not found. Looked on classpath for '" + keyPath
						+ "' and on filesystem at '" + fsPath + "'. "
						+ "If you want the key packaged inside the jar, place it under src/main/resources/" + keyPath
						+ ". "
						+ "For production, prefer mounting the key into the container and set -Dsigning.key.path=/path/to/private.pem");
			}
		}

		String pem = new String(pemBytes, StandardCharsets.UTF_8).trim();

		String base64 = pem.replaceAll("-----BEGIN ([A-Z ]+)-----", "").replaceAll("-----END ([A-Z ]+)-----", "")
				.replaceAll("\\s+", "");

		byte[] der = Base64.getDecoder().decode(base64);

		try {
			PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(der);
			return KeyFactory.getInstance(RSA).generatePrivate(spec);
		} catch (Exception ex) {
			logger.error(
					"Failed to parse private key. This configuration expects a PKCS#8 private key (-----BEGIN PRIVATE KEY-----). "
							+ "If your key is PKCS#1 (-----BEGIN RSA PRIVATE KEY-----), convert it to PKCS#8 and retry:\n\n"
							+ "  openssl pkcs8 -topk8 -nocrypt -in private.pem -out pkcs8.pem\n\n"
							+ "Then use the resulting pkcs8.pem as the signing key (or mount it into the container and set signing.key.path).",
					ex);
		}
		return null;
	}
}
