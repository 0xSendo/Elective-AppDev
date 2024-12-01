package com.Pentaforce.IntelliHealth.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Pentaforce.IntelliHealth.entity.UserEntity;
import com.Pentaforce.IntelliHealth.request.LoginRequest;
import com.Pentaforce.IntelliHealth.service.UserService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signUp")
    public ResponseEntity<?> createUser(@RequestBody UserEntity userEntity) {
        try {
            return new ResponseEntity<>(userService.createUser(userEntity), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        UserEntity user = userService.verifyLogin(loginRequest.getEmail(), loginRequest.getPassword());
        if (user != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("userID", user.getUserId());
            response.put("name", user.getName());
            response.put("email", user.getEmail());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
        }
    }

    @GetMapping
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{userID}")
    public ResponseEntity<?> getUserById(@PathVariable int userID) {
        try {
            return ResponseEntity.ok(userService.getUserById(userID));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    @DeleteMapping("/{userID}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable int userID) {
        try {
            userService.deleteUser(userID);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
