package com.Pentaforce.IntelliHealth.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "tblprogress")
public class ProgressEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int progressID;

    // @ManyToOne
    // @JoinColumn(name = "userID", nullable = false)
    //private UserEntity user;

    private float weight;
    private LocalDate date;

    // Constructors
    public ProgressEntity() {

    }

    public ProgressEntity(float weight, LocalDate date) {
        this.weight = weight;
        this.date = date;
    }

    // Getters and Setters
    public int getProgressID() {
        return progressID;
    }

    public void setProgressID(int progressID) {
        this.progressID = progressID;
    }

    // public UserEntity getUser() {
    //     return user;
    // }

    // public void setUser(UserEntity user) {
    //     this.user = user;
    // }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }
}
