package com.ReLife.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
            .authorizeHttpRequests()
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            .requestMatchers(
            		"/api/auth/**", 
            		"/api/payment/**",
            		"/api/admin/**",
            		"/api/pickups/**",
					"/api/warmup/**",
            		"/actuator/**",
            		"swagger-ui/**",
                    "/v3/api-docs/**",    // allow OpenAPI JSON
                    "/swagger-ui.html",   // older redirect
                    "/webjars/**",        // static assets if used
                    "/favicon.ico"
            	).permitAll()
            .anyRequest().authenticated()
            .and().sessionManagement().disable();
        return http.build();
    }
} 