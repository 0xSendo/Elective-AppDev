package com.Pentaforce.IntelliHealth.service;

import com.Pentaforce.IntelliHealth.entity.GoalEntity;
import com.Pentaforce.IntelliHealth.repository.GoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class GoalService {

    @Autowired
    private GoalRepository goalRepository;

    @Transactional
    public GoalEntity createGoal(GoalEntity goal) {
        return goalRepository.save(goal);
    }

    public List<GoalEntity> getAllGoals() {
        return goalRepository.findAll();
    }

    public Optional<GoalEntity> getGoalById(Integer goalID) {
        return goalRepository.findById(goalID);
    }

    @Transactional
    public GoalEntity updateGoal(Integer goalID, GoalEntity goalDetails) {
        return goalRepository.findById(goalID)
            .map(goal -> {
                goal.setType(goalDetails.getType());
                goal.setTarget(goalDetails.getTarget());
                goal.setDeadline(goalDetails.getDeadline());
                goal.setProgress(goalDetails.getProgress());
                return goalRepository.save(goal);
            })
            .orElse(null);
    }

    public void deleteGoal(Integer goalID) {
        goalRepository.deleteById(goalID);
    }
}