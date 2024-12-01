package com.Pentaforce.IntelliHealth.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tblexercises")
public class ExerciseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int exerciseID;
    
    private String category;
    private String name;
    private String description;
    
    // @ManyToMany(mappedBy = "exercises")
    // private Set<WorkoutEntity> workouts = new HashSet<>();

    // Constructors
    public ExerciseEntity() {

    }

    public ExerciseEntity(String category, String name, String description) {
        this.category = category;
        this.name = name;
        this.description = description;
    }

    // Getters and Setters
    public int getExerciseID() {
        return exerciseID;
    }

    public void setExerciseID(int exerciseID) {
        this.exerciseID = exerciseID;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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

}
