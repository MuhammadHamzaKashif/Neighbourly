package com.example.semesterProjectBackend.service;

import com.example.semesterProjectBackend.model.Availability;
import com.example.semesterProjectBackend.model.Users;
import com.example.semesterProjectBackend.repository.AvailabilityRepository;
import com.example.semesterProjectBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class AvailabilityService {
    @Autowired
    private AvailabilityRepository repo;
    @Autowired
    private UserRepository userRepo;
    public ResponseEntity<?> createSchedule(Availability availability, Principal principal) {
        String email = principal.getName();
        Users u1=userRepo.findByEmail(email).orElseThrow();
        availability.setUsers(u1);

        return new ResponseEntity<>(repo.save(availability), HttpStatus.OK);


    }

    public ResponseEntity<?> updateSchedule(int id,Availability updatedAvailability) {
       Availability availability=repo.findById(id).orElseThrow();
       availability.setDaysAvailable(updatedAvailability.getDaysAvailable());
       availability.setStartTime(updatedAvailability.getStartTime());
       availability.setEndTime(updatedAvailability.getEndTime());
       repo.save(availability);

       return new ResponseEntity<>(HttpStatus.OK);


    }

    public ResponseEntity<?> getSchedule(int id) {
        Users users = userRepo.findById(id).orElseThrow();
       return new ResponseEntity<>(repo.findByUsers(users),HttpStatus.OK);
    }

    public ResponseEntity<?> getOwnSchedule(Principal principal) {
        String email = principal.getName();
        Users users = userRepo.findByEmail(email).orElseThrow();
        return new ResponseEntity<>(repo.findByUsers(users),HttpStatus.OK);
    }
}
