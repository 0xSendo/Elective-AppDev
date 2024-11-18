package com.Pentaforce.IntelliHealth.entity;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "exercises")
public class ExerciseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long exerciseID;

    private String name;
    private String description;
    private String videoURL;
    private String category;


    @ManyToMany(mappedBy = "exercises")
    private Set<WorkoutEntity> workouts = new HashSet<>();

    // Constructors
    public ExerciseEntity() {}

    public ExerciseEntity(String name, String description, String videoURL, String category) {
        this.name = name;
        this.description = description;
        this.videoURL = videoURL;
        this.category = category;
    }

    // Getters and Setters
    public Long getExerciseID() {
        return exerciseID;
    }

    public void setExerciseID(Long exerciseID) {
        this.exerciseID = exerciseID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getVideoURL() {
        return videoURL;
    }

    public void setVideoURL(String videoURL) {
        this.videoURL = videoURL;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Set<WorkoutEntity> getWorkouts() {
        return workouts;
    }

    public void setWorkouts(Set<WorkoutEntity> workouts) {
        this.workouts = workouts;
    }
}
