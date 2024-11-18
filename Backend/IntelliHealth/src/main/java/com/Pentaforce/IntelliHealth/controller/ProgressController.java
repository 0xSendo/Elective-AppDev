package com.Pentaforce.IntelliHealth.controller;

import com.Pentaforce.IntelliHealth.entity.ProgressEntity;
import com.Pentaforce.IntelliHealth.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    // Create a new progress entry for a user
    @PostMapping("/user/{userID}")
    public ResponseEntity<?> createProgress(@PathVariable int userID, @RequestBody ProgressEntity progress) {
        try {
            ProgressEntity createdProgress = progressService.createProgress(userID, progress);
            return new ResponseEntity<>(createdProgress, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating progress: " + e.getMessage());
        }
    }

    // Get all progress entries for a specific user
    @GetMapping("/user/{userID}")
    public ResponseEntity<?> getProgressByUser(@PathVariable int userID) {
        try {
            List<ProgressEntity> progressList = progressService.getProgressByUser(userID);
            return new ResponseEntity<>(progressList, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching progress for user: " + e.getMessage());
        }
    }

    // Get a specific progress entry by ID
    @GetMapping("/{progressID}")
    public ResponseEntity<?> getProgressById(@PathVariable int progressID) {
        try {
            ProgressEntity progress = progressService.getProgressById(progressID)
                    .orElseThrow(() -> new IllegalArgumentException("Progress not found"));
            return new ResponseEntity<>(progress, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error fetching progress: " + e.getMessage());
        }
    }

    // Update a progress entry by ID
    @PutMapping("/{progressID}")
    public ResponseEntity<?> updateProgress(@PathVariable int progressID, @RequestBody ProgressEntity progressDetails) {
        try {
            ProgressEntity updatedProgress = progressService.updateProgress(progressID, progressDetails);
            return new ResponseEntity<>(updatedProgress, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error updating progress: " + e.getMessage());
        }
    }

    // Delete a progress entry by ID
    @DeleteMapping("/{progressID}")
    public ResponseEntity<?> deleteProgress(@PathVariable int progressID) {
        try {
            progressService.deleteProgress(progressID);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error deleting progress: " + e.getMessage());
        }
    }
}
