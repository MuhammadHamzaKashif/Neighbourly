package com.example.semesterProjectBackend.controller;

import com.example.semesterProjectBackend.LoginRequest;
import com.example.semesterProjectBackend.model.Users;
import com.example.semesterProjectBackend.repository.UserRepository;
import com.example.semesterProjectBackend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class RegisterController {
    @Autowired
    private UserService service;
    @Autowired
    private UserRepository userRepository;
    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerUser(@RequestBody Users user) {
        return service.registerUser(user.getUsername(), user.getEmail(), user.getPassword());
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest user, HttpServletRequest request) {
        ResponseEntity<?> response = service.loginUser(user.getEmail(), user.getPassword(), request);

        if (response.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.ok()
                        .body(Collections.singletonMap("redirectUrl", "http://localhost:8080/dashboard"));
        }
        return response;
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return ResponseEntity.ok().body(Collections.singletonMap("message", "Logged out successfully"));
    }

}