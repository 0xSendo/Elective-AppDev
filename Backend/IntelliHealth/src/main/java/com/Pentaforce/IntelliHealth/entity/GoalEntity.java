package com.Pentaforce.IntelliHealth.entity;

import jakarta.persistence.*;

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

    private String deadline;

    private boolean progress;

    // Constructors
    public GoalEntity() {}

    public GoalEntity(UserEntity user, String type, String target, String deadline, boolean progress) {
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

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public boolean getProgress() {
        return progress;
    }

    public void setProgress(Boolean progress) {
        this.progress = progress;
    }
}