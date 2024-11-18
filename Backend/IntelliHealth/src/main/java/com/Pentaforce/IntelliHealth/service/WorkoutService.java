package com.Pentaforce.IntelliHealth.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Pentaforce.IntelliHealth.entity.WorkoutEntity;
import com.Pentaforce.IntelliHealth.repository.WorkoutRepository;

import jakarta.transaction.Transactional;

@Service
public class WorkoutService {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Transactional
    public WorkoutEntity createWorkout(WorkoutEntity workout) {
        return workoutRepository.save(workout);
    }

    public List<WorkoutEntity> getAllWorkouts() {
        return workoutRepository.findAll();
    }

    public Optional<WorkoutEntity> getWorkoutById(Integer workoutID) {
        return workoutRepository.findById(workoutID);
    }

    @Transactional
    public WorkoutEntity updateWorkout(Integer workoutID, WorkoutEntity workoutDetails) {
        return workoutRepository.findById(workoutID)
            .map(workout -> {
                workout.setDate(workoutDetails.getDate());
                workout.setExerciseCompleted(workoutDetails.getExerciseCompleted());
                return workoutRepository.save(workout);
            })
            .orElse(null);
    }

    public boolean deleteWorkout(Integer workoutID) {
        if (workoutRepository.existsById(workoutID)) {
            workoutRepository.deleteById(workoutID);
            return true;
        }
        return false;
    }
}
