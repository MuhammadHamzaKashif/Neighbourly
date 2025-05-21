package com.example.semesterProjectBackend.service;

import ch.qos.logback.classic.html.DefaultThrowableRenderer;
import com.example.semesterProjectBackend.model.Users;
import com.example.semesterProjectBackend.repository.AdminRepository;
import com.example.semesterProjectBackend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.aspectj.lang.annotation.AfterReturning;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private UserRepository repo;
    @Autowired
    private AuthenticationManager authenticationManager;

    public ResponseEntity<?> registerUser(String username, String email, String password){
        Users users = new Users(username, email, password);
        String encodedPassword = bCryptPasswordEncoder.encode(users.getPassword());
        users.setPassword(encodedPassword);
        repo.save(users);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    public ResponseEntity<?> loginUser(String email, String password, HttpServletRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            HttpSession session = request.getSession(false);
            if (session != null) session.invalidate();
            session = request.getSession(true);

            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authentication);
            SecurityContextHolder.setContext(context);
            session.setAttribute("SPRING_SECURITY_CONTEXT", context);

            System.out.println(" Login successful - Session: " + session.getId());
            System.out.println("  Authenticated as: " + authentication.getName());

            return ResponseEntity.ok().body(Collections.singletonMap("redirectUrl", "/dashboard"));
        } catch(BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
    public Optional<Users> getUserByEmail(String email){
        return repo.findByEmail(email);
    }

    public ResponseEntity<?> getPoster(int id) {
        Users users = repo.findById(id).orElseThrow();
        return new ResponseEntity<>(users,HttpStatus.OK);
    }

    public ResponseEntity<?> getUser(Principal principal) {
        String email = principal.getName();
        Users users = repo.findByEmail(email).orElseThrow();
        return new ResponseEntity<>(users,HttpStatus.OK);

    }

    public ResponseEntity<?> getUserById(int id) {
        Users users = repo.findById(id).orElseThrow();
        return new ResponseEntity<>(users,HttpStatus.OK);
    }
}
