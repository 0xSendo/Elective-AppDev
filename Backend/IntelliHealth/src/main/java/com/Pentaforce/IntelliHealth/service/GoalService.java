package com.Pentaforce.IntelliHealth.service;

import com.Pentaforce.IntelliHealth.entity.GoalEntity;
import com.Pentaforce.IntelliHealth.repository.GoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GoalService {

    @Autowired
    private GoalRepository goalRepository;

    public GoalEntity createGoal(GoalEntity goal) {
        return goalRepository.save(goal);
    }

    public List<GoalEntity> getAllGoals() {
        return goalRepository.findAll();
    }

    public Optional<GoalEntity> getGoalById(Integer goalID) {
        return goalRepository.findById(goalID);
    }

    public GoalEntity updateGoal(Integer goalID, GoalEntity goalDetails) {
        Optional<GoalEntity> existingGoal = goalRepository.findById(goalID);

        if (existingGoal.isPresent()) {
            GoalEntity goal = existingGoal.get();
            goal.setTarget(goalDetails.getTarget());
            goal.setDeadline(goalDetails.getDeadline());
            return goalRepository.save(goal);
        }
        return null;
    }

    public void deleteGoal(Integer goalID) {
        goalRepository.deleteById(goalID);
    }
}
