package com.example.semesterProjectBackend.model;

import com.example.semesterProjectBackend.repository.TaskRepository;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Entity
//@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name="users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String email;
    private String password;

    @OneToMany(mappedBy = "posters")
    @JsonManagedReference("posted-tasks")
    List<Tasks> postedTasks;
    @OneToMany(mappedBy = "requester")
    @JsonManagedReference
    private List<Requests> postedRequests;
    @OneToMany(mappedBy = "volunteer")
    @JsonManagedReference("volunteered-tasks")
    List<Tasks> workedTasks;

    public Users(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
