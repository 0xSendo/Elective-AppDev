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

import com.Pentaforce.IntelliHealth.entity.WorkoutPlan;
import com.Pentaforce.IntelliHealth.service.WorkoutPlanService;

@RestController
@RequestMapping("/api/workoutplans")
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanService workoutPlanService;

    // Create a new workout plan
    @PostMapping
    public ResponseEntity<WorkoutPlan> createWorkoutPlan(@RequestBody WorkoutPlan workoutPlan) {
        WorkoutPlan createdWorkoutPlan = workoutPlanService.createWorkoutPlan(workoutPlan);
        return new ResponseEntity<>(createdWorkoutPlan, HttpStatus.CREATED);
    }

    // Get all workout plans
    @GetMapping
    public List<WorkoutPlan> getAllWorkoutPlans() {
        return workoutPlanService.getAllWorkoutPlans();
    }

    // Get a workout plan by ID
    @GetMapping("/{planID}")
    public ResponseEntity<WorkoutPlan> getWorkoutPlanById(@PathVariable Integer planID) {
        Optional<WorkoutPlan> workoutPlan = workoutPlanService.getWorkoutPlanById(planID);
        return workoutPlan.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                          .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update a workout plan
    @PutMapping("/{planID}")
    public ResponseEntity<WorkoutPlan> updateWorkoutPlan(@PathVariable Integer planID, @RequestBody WorkoutPlan workoutPlanDetails) {
        WorkoutPlan updatedWorkoutPlan = workoutPlanService.updateWorkoutPlan(planID, workoutPlanDetails);
        return updatedWorkoutPlan != null ? new ResponseEntity<>(updatedWorkoutPlan, HttpStatus.OK)
                                          : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete a workout plan
    @DeleteMapping("/{planID}")
    public ResponseEntity<HttpStatus> deleteWorkoutPlan(@PathVariable Integer planID) {
        workoutPlanService.deleteWorkoutPlan(planID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
