package com.example.semesterProjectBackend.controller;

import com.example.semesterProjectBackend.model.Users;
import com.example.semesterProjectBackend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;
@Controller
@RequestMapping("/")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ViewController {
    @Autowired
    private UserRepository userRepository;



    @GetMapping("/dashboard")
    public String dashboard(Principal principal, HttpServletRequest request, Model model) {
        // Debug session and auth
        HttpSession session = request.getSession(false);
        System.out.println("===== DASHBOARD HIT =====");
        System.out.println("Session ID: " + (session != null ? session.getId() : "NULL"));
        System.out.println("Principal: " + (principal != null ? principal.getName() : "NULL"));

        if (principal == null) {
            System.out.println("⚠️ No principal - redirecting to login");
            return "redirect:/login.html";
        }

        Users user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        model.addAttribute("user", user);
        return "index";
    }

    @GetMapping("/dashboard/admin")
    public String adminDashboard(Principal principal, HttpServletRequest request, Model model) {
        // Debug session and auth
        HttpSession session = request.getSession(false);
        System.out.println("===== DASHBOARD HIT =====");
        System.out.println("Session ID: " + (session != null ? session.getId() : "NULL"));
        System.out.println("Principal: " + (principal != null ? principal.getName() : "NULL"));

        if (principal == null) {
            System.out.println("⚠️ No principal - redirecting to login");
            return "redirect:/admin.html";
        }

        Users user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        model.addAttribute("user", user);
        return "admin";
    }
    }

