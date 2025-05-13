package com.example.semesterProjectBackend.repository;

import com.example.semesterProjectBackend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<Users,Integer> {
    Optional<Users> findByEmail (String Email);
}
