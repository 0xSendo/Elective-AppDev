package com.Pentaforce.IntelliHealth.dto;

import java.time.LocalDate;

public class GoalDTO {
    private int userID;
    private String target;
    private LocalDate deadline;       // Optional for user linkage

    public GoalDTO() {

    }

    public GoalDTO(int userID, String target, LocalDate deadline) {
        this.userID = userID;
        this.target = target;
        this.deadline = deadline;
    }

    // Getters and Setters
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

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }
}
