package com.example.semesterProjectBackend.repository;

import com.example.semesterProjectBackend.model.Requests;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Requests, Integer> {
    List<Requests> findByRequesterId(int requesterId);
//    List<Requests> findAvailableRequests(int userId);
}
