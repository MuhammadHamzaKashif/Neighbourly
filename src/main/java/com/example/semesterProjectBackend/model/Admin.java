package com.example.semesterProjectBackend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="admins")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
    @Id
    int id;
    @OneToOne
    @JoinColumn(name = "email", referencedColumnName = "email", unique = true)
    private Users user;
    private String permissions;
}
