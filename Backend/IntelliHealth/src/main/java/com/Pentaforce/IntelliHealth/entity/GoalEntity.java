package com.Pentaforce.IntelliHealth.entity;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "tblgoal")
public class GoalEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int goalID;

    // @ManyToOne
    // @JoinColumn(name = "userID", nullable = false)
    // private UserEntity user;
    private String target;
    private LocalDate deadline;

    // Constructors
    public GoalEntity() {
        
    }

    public GoalEntity(String target, LocalDate deadline) {
        //this.user = user;
        this.target = target;
        this.deadline = deadline;
    }

    // Getters and Setters
    public int getGoalID() {
        return goalID;
    }

    public void setGoalID(int goalID) {
        this.goalID = goalID;
    }

    // public UserEntity getUser() {
    //     return user;
    // }

    // public void setUser(UserEntity user) {
    //     this.user = user;
    // }

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
}
