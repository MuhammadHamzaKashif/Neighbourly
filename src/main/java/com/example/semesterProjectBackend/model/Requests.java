package com.example.semesterProjectBackend.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Requests {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String category;
    @Column(length = 2000)
    private String description;
    private String dateNeeded;
    private String timeNeeded;
    private String urgency;
    private String duration;

    private String address;
    private String city;
    private String zip;
    private String locationNotes;

    private boolean needsCar;
    private boolean needsExperience;
    private boolean needsBackgroundCheck;

    private String volunteerPreference;

    @Column(length = 2000)
    private String specialInstructions;

    private boolean isApproved = false;

    @ManyToOne
    @JoinColumn(name = "requester_id")
    @JsonBackReference
    private Users requester;
}
