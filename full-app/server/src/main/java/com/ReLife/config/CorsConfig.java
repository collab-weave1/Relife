package com.ReLife.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				
				registry.addMapping("/api/**")
						.allowedOriginPatterns("http://localhost:8080",
								"http://localhost:3000", 
								"http://localhost:5173",
								"https://relife-y0xi.onrender.com")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
						.allowedHeaders("*")
						.allowCredentials(true)
						.maxAge(3600);

				registry.addMapping("/actuator/**")
						.allowedOriginPatterns("http://localhost:8080",
								"http://localhost:3000", 
								"http://localhost:5173",
								"https://relife-y0xi.onrender.com")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
						.allowedHeaders("*")
						.allowCredentials(true)
						.maxAge(3600);
				
				registry.addMapping("/swagger-ui/**")
					.allowedOriginPatterns("http://localhost:8080",
							"http://localhost:3000", 
							"http://localhost:5173",
							"https://relife-y0xi.onrender.com")
					.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
					.allowedHeaders("*")
					.allowCredentials(true)
					.maxAge(3600);
				
				registry.addMapping("/v3/api-docs/**")
				.allowedOriginPatterns("http://localhost:8080",
						"http://localhost:3000", 
						"http://localhost:5173",
						"https://relife-y0xi.onrender.com")
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
				.allowedHeaders("*")
				.allowCredentials(true)
				.maxAge(3600);
				
				registry.addMapping("/webjars/**")
				.allowedOriginPatterns("http://localhost:8080", 
						"http://localhost:5173",
						"https://relife-y0xi.onrender.com")
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
				.allowedHeaders("*")
				.allowCredentials(true)
				.maxAge(3600);
		
			}
		};
	}
}