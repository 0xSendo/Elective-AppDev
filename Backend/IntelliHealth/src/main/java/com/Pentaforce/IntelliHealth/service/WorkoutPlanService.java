package com.Pentaforce.IntelliHealth.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Pentaforce.IntelliHealth.entity.WorkoutPlanEntity;
import com.Pentaforce.IntelliHealth.repository.WorkoutPlanRepository;

import jakarta.transaction.Transactional;

@Service
public class WorkoutPlanService {

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

    @Transactional
    public WorkoutPlanEntity createWorkoutPlan(WorkoutPlanEntity workoutPlan) {
        return workoutPlanRepository.save(workoutPlan);
    }

    public List<WorkoutPlanEntity> getAllWorkoutPlans() {
        return workoutPlanRepository.findAll();
    }

    public Optional<WorkoutPlanEntity> getWorkoutPlanById(Integer planID) {
        return workoutPlanRepository.findById(planID);
    }

    public WorkoutPlanEntity updateWorkoutPlan(Integer planID, WorkoutPlanEntity workoutPlan) {
        workoutPlan.setPlanID(planID);
        return workoutPlanRepository.save(workoutPlan);
    }
    
    public void addWorkoutPlan(WorkoutPlanEntity workoutPlan) {
        workoutPlanRepository.save(workoutPlan);
    }    

    public void deleteWorkoutPlan(Integer planID) {
        workoutPlanRepository.deleteById(planID);
    }
}
