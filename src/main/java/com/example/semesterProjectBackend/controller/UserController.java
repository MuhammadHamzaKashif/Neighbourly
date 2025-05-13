package com.example.semesterProjectBackend.controller;

import com.example.semesterProjectBackend.repository.AdminRepository;
import com.example.semesterProjectBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Controller
@CrossOrigin
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService service;
    @Autowired
    AdminRepository adminRepository;

    @GetMapping("/poster/{id}")
    public ResponseEntity<?> getPoster(@PathVariable int id){
        return service.getPoster(id);

    }
    @GetMapping("/user")
    public ResponseEntity<?> getUser(Principal principal){
        return service.getUser(principal);
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable int id){
        return service.getUserById(id);
    }
    @GetMapping("/user/is-admin")
    public ResponseEntity<Boolean> isAdmin(@RequestParam String email) {
        boolean isAdmin = adminRepository.existsByUser_Email(email);
    System.out.println("USER WITH EMAIL: " + email + " IS ADMIN: " + isAdmin);
        System.out.println(isAdmin);
        return ResponseEntity.ok(isAdmin);
    }
}
