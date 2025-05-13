package com.example.semesterProjectBackend.repository;

import com.example.semesterProjectBackend.model.Tasks;
import com.example.semesterProjectBackend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface TaskRepository extends JpaRepository<Tasks,Integer> {
    List<Tasks> findByPosters(Users poster);
    List<Tasks> findByVolunteer (Users volunteer);
    List<Tasks> findByDescriptionContainingIgnoreCase (String description);
}
