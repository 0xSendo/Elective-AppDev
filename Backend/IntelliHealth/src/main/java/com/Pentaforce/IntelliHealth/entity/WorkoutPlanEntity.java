package com.Pentaforce.IntelliHealth.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tblworkoutplan")
public class WorkoutPlanEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int planID;

    // @ManyToOne
    // @JoinColumn(name = "userID", nullable = false)
    // private UserEntity user;

    private int duration;
 
    @Column(name="weekly_goal")
    private String weeklyGoal;

    // Constructors
    public WorkoutPlanEntity() {
    }

    public WorkoutPlanEntity(int duration, String weeklyGoal) {
        this.duration = duration;
        this.weeklyGoal = weeklyGoal;
    }

    // Getters and Setters
    public int getPlanID() {
        return planID;
    }

    public void setPlanID(int planID) {
        this.planID = planID;
    }

    // public UserEntity getUser() {
    //     return user;
    // }

    // public void setUser(UserEntity user) {
    //     this.user = user;
    // }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getWeeklyGoal() {
        return weeklyGoal;
    }

    public void setWeeklyGoal(String weeklyGoal) {
        this.weeklyGoal = weeklyGoal;
    }
}
