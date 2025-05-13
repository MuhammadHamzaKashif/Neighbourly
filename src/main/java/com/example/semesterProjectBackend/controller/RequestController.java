package com.example.semesterProjectBackend.controller;

import com.example.semesterProjectBackend.model.Requests;
import com.example.semesterProjectBackend.model.Users;
import com.example.semesterProjectBackend.repository.RequestRepository;
import com.example.semesterProjectBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "http://127.0.0.1:5500") // Add specific frontend URL in production!
public class RequestController {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    // POST a new request by a user
    @PostMapping("/create/{userId}")
    public Requests createRequest(@PathVariable int userId, @RequestBody Requests request) {
        System.out.println("REQUEST RECEIVED FOR CREATION ");
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        request.setRequester(user);
        return requestRepository.save(request);
    }

    // GET all requests
    @GetMapping("/all")
    public List<Requests> getAllRequests() {
        return requestRepository.findAll();
    }
    @GetMapping("/{id}/requester")
    public Users getRequesterById(@PathVariable int id){
        return requestRepository.findById(id).get().getRequester();
    }

    // GET all requests posted by a specific user
    @GetMapping("/user/{userId}")
    public List<Requests> getRequestsByUser(@PathVariable int userId) {
        return requestRepository.findByRequesterId(userId);
    }
    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approveRequest(@PathVariable int id) {
        Requests request = requestRepository.findById(id).get();
        request.setApproved(true);
        requestRepository.save(request);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/{id}/deny")
    public ResponseEntity<?> denyRequest(@PathVariable int id) {
        Requests request = requestRepository.findById(id).get();
        requestRepository.delete(request);
        return ResponseEntity.ok().build();
    }
}