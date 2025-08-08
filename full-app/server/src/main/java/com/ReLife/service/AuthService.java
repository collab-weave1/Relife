//package com.ReLife.service;
//
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import com.ReLife.dto.AuthRequestDto;
//import com.ReLife.dto.AuthResponseDto;
//import com.ReLife.dto.UserDto;
//import com.ReLife.model.User;
//import com.ReLife.repository.RoleRepository;
//import com.ReLife.repository.UserRepository;
//
//import java.util.Date;
//
//@Service
//public class AuthService {
//    private final UserRepository userRepo;
//    private final RoleRepository roleRepo;
//    private final PasswordEncoder passwordEncoder;
//    private final String jwtSecret;
//    private final long jwtExpiration;
//
//    public AuthService(UserRepository userRepo,
//                       RoleRepository roleRepo,
//                       PasswordEncoder passwordEncoder,
//                       @Value("${jwt.secret}") String jwtSecret,
//                       @Value("${jwt.expiration}") long jwtExpiration) {
//        this.userRepo = userRepo;
//        this.roleRepo = roleRepo;
//        this.passwordEncoder = passwordEncoder;
//        this.jwtSecret = jwtSecret;
//        this.jwtExpiration = jwtExpiration;
//    }
//
//    public AuthResponseDto register(AuthRequestDto req) {
//        Role userRole = roleRepo.findByName("USER").orElseThrow();
//        User user = new User(req.email(), passwordEncoder.encode(req.password()));
//        user.setRole(userRole);
//        userRepo.save(user);
//        String token = generateToken(user);
//        return new AuthResponseDto(token, mapToDto(user));
//    }
//
//    public AuthResponseDto login(AuthRequestDto req) {
//        User user = userRepo.findByEmail(req.email())
//                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
//        if (!passwordEncoder.matches(req.password(), user.getPassword())) {
//            throw new RuntimeException("Invalid credentials");
//        }
//        String token = generateToken(user);
//        return new AuthResponseDto(token, mapToDto(user));
//    }
//
//    private String generateToken(User user) {
//        Date now = new Date();
//        Date expiry = new Date(now.getTime() + jwtExpiration);
//        return Jwts.builder()
//                .setSubject(user.getId().toString())
//                .setIssuedAt(now)
//                .setExpiration(expiry)
//                .signWith(SignatureAlgorithm.HS256, jwtSecret)
//                .compact();
//    }
//
//    private UserDto mapToDto(User user) {
//        return new UserDto(user.getId(), user.getEmail(), user.getRole().getName());
//    }
//}