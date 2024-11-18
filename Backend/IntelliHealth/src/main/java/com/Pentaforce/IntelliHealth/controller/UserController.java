package com.Pentaforce.IntelliHealth.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Pentaforce.IntelliHealth.entity.UserEntity;
import com.Pentaforce.IntelliHealth.exception.UserNotFoundException;
import com.Pentaforce.IntelliHealth.request.LoginRequest;
import com.Pentaforce.IntelliHealth.service.UserService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Create a new user
    @PostMapping("/signUp")
    public ResponseEntity<?> createUser(@RequestBody UserEntity user) {
        try {
            UserEntity createdUser = userService.createProfile(user);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user data: " + e.getMessage());
        }catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating user: " + e.getMessage());
        }
    }

    // Add this in UserController
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        UserEntity user = userService.verifyLogin(loginRequest.getEmail(), loginRequest.getPassword());

        if (user != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("userID", user.getUserId());
            response.put("name", user.getName());
            response.put("email", user.getEmail());
            return ResponseEntity.ok(response); // Return user data or a success message
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed: Invalid credentials.");
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody UserEntity userEntity) {
        try {
            UserEntity updatedProfile = userService.createProfile(userEntity);
            return ResponseEntity.ok(updatedProfile);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }


    // Get all users
    @GetMapping
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Get a user by ID
    @GetMapping("/{userID}")
    public ResponseEntity<?> getUserById(@PathVariable Integer userID) {
        try {
            UserEntity user = userService.getUserById(userID);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with ID: " + userID);
        }
    }

    // Update a user
    @PutMapping("/{userID}")
    public ResponseEntity<?> updateUser(@PathVariable Integer userID, @RequestBody UserEntity userDetails) {
        try{
            UserEntity updatedUser = userService.updateUser(userID, userDetails);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating user: " +e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    // Delete a user
    @DeleteMapping("/{userID}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable Integer userID) {
        try{
            userService.deleteUser(userID);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
