package com.Pentaforce.IntelliHealth.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Pentaforce.IntelliHealth.entity.WorkoutPlanEntity;
import com.Pentaforce.IntelliHealth.service.WorkoutPlanService;

@RestController
@RequestMapping("/api/workoutplans")
@CrossOrigin(origins = "http://localhost:5173")
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanService workoutPlanService;
   
    @PostMapping
    public ResponseEntity<WorkoutPlanEntity> createWorkoutPlan(@RequestBody WorkoutPlanEntity workoutPlan) {
        WorkoutPlanEntity createdPlan = workoutPlanService.createWorkoutPlan(workoutPlan);
        return new ResponseEntity<>(createdPlan, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<WorkoutPlanEntity>> getAllWorkoutPlans() {
        List<WorkoutPlanEntity> workoutPlans = workoutPlanService.getAllWorkoutPlans();
        return new ResponseEntity<>(workoutPlans, HttpStatus.OK);
    }

    @PutMapping("/{planID}")
    public ResponseEntity<WorkoutPlanEntity> updateWorkoutPlan(@PathVariable Integer planID, @RequestBody WorkoutPlanEntity workoutPlan) {
        Optional<WorkoutPlanEntity> existingPlan = workoutPlanService.getWorkoutPlanById(planID);
        if (existingPlan.isPresent()) {
            WorkoutPlanEntity updatedPlan = workoutPlanService.updateWorkoutPlan(planID, workoutPlan);
            return new ResponseEntity<>(updatedPlan, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{planID}")
    public ResponseEntity<Void> deleteWorkoutPlan(@PathVariable Integer planID) {
        workoutPlanService.deleteWorkoutPlan(planID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
