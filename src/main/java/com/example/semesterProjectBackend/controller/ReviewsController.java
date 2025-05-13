package com.example.semesterProjectBackend.controller;

import com.example.semesterProjectBackend.model.Reviews;
import com.example.semesterProjectBackend.service.ReviewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Controller
@RequestMapping("/api")
@CrossOrigin
public class ReviewsController {
    @Autowired
    private ReviewsService service;
    @PostMapping("/review/{id}")
    public ResponseEntity<?> createReview(@RequestBody Reviews review, Principal principal,@PathVariable int id){
        return service.createReview(review,principal,id);
    }
    @GetMapping("/getReview/{id}")
    public ResponseEntity<?> getReview(@PathVariable int id){
        return service.getReview(id);
    }
}