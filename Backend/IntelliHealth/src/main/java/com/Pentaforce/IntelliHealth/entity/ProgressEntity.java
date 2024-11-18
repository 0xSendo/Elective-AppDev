package com.Pentaforce.IntelliHealth.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "progress")
public class ProgressEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int progressID;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private UserEntity user;

    @Temporal(TemporalType.DATE)
    private Date date;

    private float weight;

    // Constructors
    public ProgressEntity() {}

    public ProgressEntity(UserEntity user, Date date, float weight) {
        this.user = user;
        this.date = date;
        this.weight = weight;
    }

    // Getters and Setters
    public int getProgressID() {
        return progressID;
    }

    public void setProgressID(int progressID) {
        this.progressID = progressID;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }
}
