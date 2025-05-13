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
    private String dateNeeded;    // e.g. "2025-05-15"
    private String timeNeeded;    // e.g. "morning", "afternoon", "evening"
    private String urgency;       // low, normal, high
    private String duration;      // 30min, 1hour, etc.

    private String address;
    private String city;
    private String zip;
    private String locationNotes;

    private boolean needsCar;
    private boolean needsExperience;
    private boolean needsBackgroundCheck;

    private String volunteerPreference; // none, previous, specific

    @Column(length = 2000)
    private String specialInstructions;

    private boolean isApproved = false;

    @ManyToOne
    @JoinColumn(name = "requester_id")
    @JsonBackReference
    private Users requester;
}
