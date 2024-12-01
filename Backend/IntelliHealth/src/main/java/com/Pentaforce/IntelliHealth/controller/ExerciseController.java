package com.Pentaforce.IntelliHealth.controller;

import com.Pentaforce.IntelliHealth.entity.ExerciseEntity;
import com.Pentaforce.IntelliHealth.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    private final ExerciseService exerciseService;

    @Autowired
    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    // Create or Update an exercise
    @PostMapping
    public ResponseEntity<ExerciseEntity> createExercise(@RequestBody ExerciseEntity exercise) {
        ExerciseEntity savedExercise = exerciseService.saveExercise(exercise);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedExercise);
    }

    // Retrieve an exercise by ID
    @GetMapping("/{id}")
    public ResponseEntity<ExerciseEntity> getExercise(@PathVariable int exerciseID) {  // Changed to int
        Optional<ExerciseEntity> exercise = exerciseService.getExerciseById(exerciseID);
        return exercise.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Retrieve all exercises
    @GetMapping
    public List<ExerciseEntity> getAllExercises() {
        return exerciseService.getAllExercises();
    }

    // Update an existing exercise
    @PutMapping("/{id}")
    public ResponseEntity<ExerciseEntity> updateExercise(@PathVariable int exerciseID, @RequestBody ExerciseEntity exerciseDetails) {  // Changed to int
        Optional<ExerciseEntity> exerciseOptional = exerciseService.getExerciseById(exerciseID);
        if (exerciseOptional.isPresent()) {
            ExerciseEntity existingExercise = exerciseOptional.get();
            existingExercise.setName(exerciseDetails.getName());
            existingExercise.setDescription(exerciseDetails.getDescription());
            existingExercise.setCategory(exerciseDetails.getCategory());

            ExerciseEntity updatedExercise = exerciseService.saveExercise(existingExercise);
            return ResponseEntity.ok(updatedExercise);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an exercise by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExercise(@PathVariable int exerciseID) {  // Changed to int
        if (exerciseService.getExerciseById(exerciseID).isPresent()) {
            exerciseService.deleteExercise(exerciseID);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
