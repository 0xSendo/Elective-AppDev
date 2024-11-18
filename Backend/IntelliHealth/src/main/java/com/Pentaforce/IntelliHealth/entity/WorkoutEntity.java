package com.Pentaforce.IntelliHealth.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tblworkout")
public class WorkoutEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int workoutID;

    @ManyToOne
    @JoinColumn(name = "planID", nullable = false)
    private WorkoutPlan workPlan;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String exerciseCompleted;

    @ManyToMany
    @JoinTable(
        name = "workout_exercise",
        joinColumns = @JoinColumn(name = "workout_id"),
        inverseJoinColumns = @JoinColumn(name = "exercise_id")
    )
    private Set<ExerciseEntity> exercises = new HashSet<>();

    // Constructors
    public WorkoutEntity() {}

    public WorkoutEntity(WorkoutPlan workPlan, LocalDate date, String exerciseCompleted) {
        this.workPlan = workPlan;
        this.date = date;
        this.exerciseCompleted = exerciseCompleted;
    }

    // Getters and Setters
    public int getWorkoutID() {
        return workoutID;
    }

    public void setWorkoutID(int workoutID) {
        this.workoutID = workoutID;
    }

    public WorkoutPlan getWorkPlan() {
        return workPlan;
    }

    public void setWorkPlan(WorkoutPlan workPlan) {
        this.workPlan = workPlan;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getExerciseCompleted() {
        return exerciseCompleted;
    }

    public void setExerciseCompleted(String exerciseCompleted) {
        this.exerciseCompleted = exerciseCompleted;
    }

    public Set<ExerciseEntity> getExercises() {
        return exercises;
    }

    public void setExercises(Set<ExerciseEntity> exercises) {
        this.exercises = exercises;
    }
}
