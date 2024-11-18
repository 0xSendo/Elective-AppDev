package com.Pentaforce.IntelliHealth.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tblgoal")
public class GoalEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int goalID;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private UserEntity user;

    private String type;

    private String target;

    private LocalDate deadline;

    private float progress;

    // Constructors
    public GoalEntity() {}

    public GoalEntity(UserEntity user, String type, String target, LocalDate deadline, float progress) {
        this.user = user;
        this.type = type;
        this.target = target;
        this.deadline = deadline;
        this.progress = progress;
    }

    // Getters and Setters
    public int getGoalID() {
        return goalID;
    }

    public void setGoalID(int goalID) {
        this.goalID = goalID;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public float getProgress() {
        return progress;
    }

    public void setProgress(float progress) {
        this.progress = progress;
    }
}
