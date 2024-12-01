package com.Pentaforce.IntelliHealth.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Pentaforce.IntelliHealth.entity.ExerciseEntity;
import com.Pentaforce.IntelliHealth.repository.ExerciseRepository;

import jakarta.transaction.Transactional;

@Service
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;

    @Autowired
    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    // Create or Update an exercise
    @Transactional
    public ExerciseEntity saveExercise(ExerciseEntity exercise) {
        return exerciseRepository.save(exercise);
    }

    // Retrieve an exercise by ID
    public Optional<ExerciseEntity> getExerciseById(int exerciseID) {  
        return exerciseRepository.findById(exerciseID);
    }

    // Retrieve all exercises
    public List<ExerciseEntity> getAllExercises() {
        return exerciseRepository.findAll();
    }

    // Delete an exercise by ID
    @Transactional
    public void deleteExercise(int exerciseID) {  
        exerciseRepository.deleteAll();
    }
}
