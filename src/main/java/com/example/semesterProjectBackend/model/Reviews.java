package com.example.semesterProjectBackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int rating;
    private String description;
    private String createdAt;

    @ManyToOne
    @JoinColumn(name = "reviewer_id")
    private Users reviewer;
    @ManyToOne
    @JoinColumn(name = "reviewee_id")
    private Users reviewee;

    @OneToOne
    @JoinColumn(name = "task_id")
    private Tasks task;


}
