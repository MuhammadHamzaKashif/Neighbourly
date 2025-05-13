package com.example.semesterProjectBackend.repository;

import com.example.semesterProjectBackend.model.Reviews;
import com.example.semesterProjectBackend.model.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewsRepository extends JpaRepository<Reviews,Integer> {
    Reviews findByTask(Tasks task);
}
