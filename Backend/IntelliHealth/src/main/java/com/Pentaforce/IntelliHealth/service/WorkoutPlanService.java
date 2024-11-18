package com.Pentaforce.IntelliHealth.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Pentaforce.IntelliHealth.entity.WorkoutPlan;
import com.Pentaforce.IntelliHealth.repository.WorkoutPlanRepository;

import jakarta.transaction.Transactional;

@Service
public class WorkoutPlanService {

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

    @Transactional
    public WorkoutPlan createWorkoutPlan(WorkoutPlan workoutPlan) {
        return workoutPlanRepository.save(workoutPlan);
    }

    public List<WorkoutPlan> getAllWorkoutPlans() {
        return workoutPlanRepository.findAll();
    }

    public Optional<WorkoutPlan> getWorkoutPlanById(Integer planID) {
        return workoutPlanRepository.findById(planID);
    }

    @Transactional
    public WorkoutPlan updateWorkoutPlan(Integer planID, WorkoutPlan workoutPlanDetails) {
        return workoutPlanRepository.findById(planID)
            .map(workoutPlan -> {
                workoutPlan.setDuration(workoutPlanDetails.getDuration());
                workoutPlan.setWeeklyGoal(workoutPlanDetails.getWeeklyGoal());
                return workoutPlanRepository.save(workoutPlan);
            })
            .orElse(null);
    }

    public void deleteWorkoutPlan(Integer planID) {
        workoutPlanRepository.deleteById(planID);
    }
}
