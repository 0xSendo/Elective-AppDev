package com.Pentaforce.IntelliHealth.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tblworkoutplan")
public class WorkoutPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int planID;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private UserEntity user;

    @Column(nullable = false)
    private int duration;

    @Column(nullable = false)
    private String weekly_goal;

    // Constructors
    public WorkoutPlan() {
    }

    public WorkoutPlan(UserEntity user, int duration, String weekly_goal) {
        this.user = user;
        this.duration = duration;
        this.weekly_goal = weekly_goal;
    }

    // Getters and Setters
    public int getPlanID() {
        return planID;
    }

    public void setPlanID(int planID) {
        this.planID = planID;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getWeeklyGoal() {
        return weekly_goal;
    }

    public void setWeeklyGoal(String weekly_goal) {
        this.weekly_goal = weekly_goal;
    }
}
