package com.Pentaforce.IntelliHealth.controller;

import com.Pentaforce.IntelliHealth.entity.GoalEntity;
import com.Pentaforce.IntelliHealth.service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    @Autowired
    private GoalService goalService;

    // Create a new goal
    @PostMapping
    public ResponseEntity<GoalEntity> createGoal(@RequestBody GoalEntity goal) {
        GoalEntity createdGoal = goalService.createGoal(goal);
        return new ResponseEntity<>(createdGoal, HttpStatus.CREATED);
    }

    // Get all goals
    @GetMapping
    public List<GoalEntity> getAllGoals() {
        return goalService.getAllGoals();
    }

    // Get a goal by ID
    @GetMapping("/{goalID}")
    public ResponseEntity<GoalEntity> getGoalById(@PathVariable Integer goalID) {
        Optional<GoalEntity> goal = goalService.getGoalById(goalID);
        return goal.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                   .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update a goal
    @PutMapping("/{goalID}")
    public ResponseEntity<GoalEntity> updateGoal(@PathVariable Integer goalID, @RequestBody GoalEntity goalDetails) {
        GoalEntity updatedGoal = goalService.updateGoal(goalID, goalDetails);
        return updatedGoal != null ? new ResponseEntity<>(updatedGoal, HttpStatus.OK)
                                   : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete a goal
    @DeleteMapping("/{goalID}")
    public ResponseEntity<HttpStatus> deleteGoal(@PathVariable Integer goalID) {
        goalService.deleteGoal(goalID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
