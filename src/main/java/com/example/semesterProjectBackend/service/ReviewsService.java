package com.example.semesterProjectBackend.service;

import com.example.semesterProjectBackend.model.Reviews;
import com.example.semesterProjectBackend.model.Tasks;
import com.example.semesterProjectBackend.model.Users;
import com.example.semesterProjectBackend.repository.ReviewsRepository;
import com.example.semesterProjectBackend.repository.TaskRepository;
import com.example.semesterProjectBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class ReviewsService {
    @Autowired
    private ReviewsRepository repository;
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> getReview(int id) {
        Tasks tasks = taskRepository.findById(id).orElseThrow();
        Reviews reviews = repository.findByTask(tasks);
        return new ResponseEntity<>(reviews, HttpStatus.OK);

    }

    public ResponseEntity<?> createReview(Reviews review, Principal principal,int id) {
        Tasks tasks = taskRepository.findById(id).orElseThrow();
        review.setTask(tasks);
        review.setReviewee(tasks.getVolunteer());
        String email = principal.getName();
        Users reviewer=userRepository.findByEmail(email).orElseThrow();

        review.setReviewer(reviewer);

        return new ResponseEntity<>(repository.save(review),HttpStatus.OK);
    }
}
