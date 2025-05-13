package com.example.semesterProjectBackend.repository;

import com.example.semesterProjectBackend.model.Admin;
import com.example.semesterProjectBackend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {
    boolean existsByUser_Email(String email);

    //Optional<Users> findById (int id);

    //Optional<Object> findByEmail(String email);
}
