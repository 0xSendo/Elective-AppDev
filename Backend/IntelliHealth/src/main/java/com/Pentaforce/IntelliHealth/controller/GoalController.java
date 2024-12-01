package com.Pentaforce.IntelliHealth.controller;

import com.Pentaforce.IntelliHealth.entity.GoalEntity;
import com.Pentaforce.IntelliHealth.service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173") // Adjust the URL based on your frontend
@RestController
@RequestMapping("/api/goals")
public class GoalController {

    @Autowired
    private GoalService goalService;

    @PostMapping
    public ResponseEntity<GoalEntity> createGoal(@RequestBody GoalEntity goal) {
        try {
            GoalEntity createdGoal = goalService.createGoal(goal);
            return new ResponseEntity<>(createdGoal, HttpStatus.CREATED);
        } catch (Exception e) {
            // Log the error for debugging
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public List<GoalEntity> getAllGoals() {
        return goalService.getAllGoals();
    }

    @GetMapping("/{goalID}")
    public ResponseEntity<GoalEntity> getGoalById(@PathVariable Integer goalID) {
        Optional<GoalEntity> goal = goalService.getGoalById(goalID);
        return goal.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{goalID}")
    public ResponseEntity<GoalEntity> updateGoal(
            @PathVariable Integer goalID,
            @RequestBody GoalEntity goalDetails) {
        GoalEntity updatedGoal = goalService.updateGoal(goalID, goalDetails);
        return updatedGoal != null
                ? new ResponseEntity<>(updatedGoal, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{goalID}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Integer goalID) {
        try {
            goalService.deleteGoal(goalID);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
