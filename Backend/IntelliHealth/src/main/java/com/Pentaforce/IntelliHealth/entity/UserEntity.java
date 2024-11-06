package com.Pentaforce.IntelliHealth.entity;

//import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tbluser")
public class UserEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userID;

    //@Column(nullable = false)                 //cannot be empty
    private String name;

    //@Column(nullable = false, unique=true)      //cannot be empty, no duplication allowed
    private String email;

    //@Column(nullable = false)
    private String password;

    //@Column(nullable = false)                 //cant successfully sign up if this line is coded
    private String fitnessLevel;

    //@Column(nullable = false)
    private String gender;

    //@Column(nullable = false)
    private float weight;

    //@Column(nullable = false)
    private float height;

    //@Column(nullable = false)
    private float weightGoal;

    
    //Constructors
    public UserEntity(){

    }

    public UserEntity(String name, String email, String password, String gender, String fitnessLevel, float weight, float height, float weightGoal) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.fitnessLevel = fitnessLevel;
        this.weight = weight;
        this.height = height;
        this.weightGoal = weightGoal;
    }

    // Getters and setters
    public int getUserId() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getFitnessLevel() {
        return fitnessLevel;
    }

    public void setFitnessLevel(String fitnessLevel) {
        this.fitnessLevel = fitnessLevel;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public float getHeight() {
        return height;
    }

    public void setHeight(float height) {
        this.height = height;

    }

    public float getWeightGoal() {
        return weightGoal;
    }

    public void setWeightGoal(float weightGoal) {
        this.weightGoal = weightGoal;
    }

   

}
