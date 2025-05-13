package com.example.semesterProjectBackend.controller;

import com.example.semesterProjectBackend.model.Availability;
import com.example.semesterProjectBackend.service.AvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class AvailabilityController {
    @Autowired
    private AvailabilityService service;
    @PostMapping("/createSchedule")
    public ResponseEntity<?> createSchedule(@RequestBody Availability availability, Principal principal){
        return service.createSchedule(availability,principal);
    }
    @PutMapping("/createSchedule/{id}")
    public ResponseEntity<?> updateSchedule(@PathVariable int id,@RequestBody Availability availability){
        return service.updateSchedule(id,availability);
    }
    @GetMapping("/schedule/{id}")
    public ResponseEntity<?> getSchedule(@PathVariable int id){
        return service.getSchedule(id);
    }
    @GetMapping("/schedule")
    public ResponseEntity<?> getOwnSchedule(Principal principal)
    {
        return service.getOwnSchedule(principal);
    }
}
