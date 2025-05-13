package com.example.semesterProjectBackend.repository;

import com.example.semesterProjectBackend.model.Availability;
import com.example.semesterProjectBackend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AvailabilityRepository extends JpaRepository<Availability,Integer> {

    Optional<Availability> findByUsers(Users users);
}
