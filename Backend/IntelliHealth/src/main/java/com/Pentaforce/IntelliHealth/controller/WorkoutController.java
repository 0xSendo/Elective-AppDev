package com.Pentaforce.IntelliHealth.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Pentaforce.IntelliHealth.entity.WorkoutEntity;
import com.Pentaforce.IntelliHealth.service.WorkoutService;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {

    @Autowired
    private WorkoutService workoutService;

    // Create a new workout
    @PostMapping
    public ResponseEntity<WorkoutEntity> createWorkout(@RequestBody WorkoutEntity workout) {
        WorkoutEntity createdWorkout = workoutService.createWorkout(workout);
        return new ResponseEntity<>(createdWorkout, HttpStatus.CREATED);
    }

    // Get all workouts
    @GetMapping
    public List<WorkoutEntity> getAllWorkouts() {
        return workoutService.getAllWorkouts();
    }

    // Get a workout by ID
    @GetMapping("/{workoutID}")
    public ResponseEntity<WorkoutEntity> getWorkoutById(@PathVariable Integer workoutID) {
        Optional<WorkoutEntity> workout = workoutService.getWorkoutById(workoutID);
        return workout.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                      .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update a workout by ID
    @PutMapping("/{workoutID}")
    public ResponseEntity<WorkoutEntity> updateWorkout(@PathVariable Integer workoutID,
                                                 @RequestBody WorkoutEntity workoutDetails) {
        WorkoutEntity updatedWorkout = workoutService.updateWorkout(workoutID, workoutDetails);
        return updatedWorkout != null ? new ResponseEntity<>(updatedWorkout, HttpStatus.OK)
                                      : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete a workout by ID
    @DeleteMapping("/{workoutID}")
    public ResponseEntity<Void> deleteWorkout(@PathVariable Integer workoutID) {
        if (workoutService.deleteWorkout(workoutID)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
