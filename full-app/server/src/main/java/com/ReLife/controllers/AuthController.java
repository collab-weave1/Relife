//package com.ReLife.controllers;
//
//import com.relife.dto.AuthRequestDto;
//import com.relife.dto.AuthResponseDto;
//import com.relife.service.AuthService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/auth")
//public class AuthController {
//    private final AuthService authService;
//    public AuthController(AuthService authService) { this.authService = authService; }
//
//    @PostMapping("/register")
//    public ResponseEntity<AuthResponseDto> register(@RequestBody AuthRequestDto request) {
//        return ResponseEntity.ok(authService.register(request));
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<AuthResponseDto> login(@RequestBody AuthRequestDto request) {
//        return ResponseEntity.ok(authService.login(request));
//    }
//}