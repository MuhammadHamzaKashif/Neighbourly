package com.example.semesterProjectBackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String description;
    private String createdAt;
    private String status;
    private String category;

    @ManyToOne
    @JoinColumn(name="requester_id")
    @JsonBackReference("posted-tasks")
    private Users posters;

    @ManyToOne
    @JoinColumn(name = "volunteer_id")
    @JsonBackReference("volunteered-tasks")
    private Users volunteer;

    @ManyToOne
    @JoinColumn(name = "request_id")
    @JsonBackReference("request-tasks")
    private Requests request;

    private String imageName;
    private String imageType;

    @Lob
    private byte[] imageData;
}
