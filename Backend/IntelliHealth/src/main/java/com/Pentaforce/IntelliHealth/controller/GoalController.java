package com.Pentaforce.IntelliHealth.controller;

import com.Pentaforce.IntelliHealth.dto.GoalDTO;
import com.Pentaforce.IntelliHealth.entity.GoalEntity;
import com.Pentaforce.IntelliHealth.entity.UserEntity;
import com.Pentaforce.IntelliHealth.service.GoalService;
import com.Pentaforce.IntelliHealth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    @Autowired
    private GoalService goalService;

    @Autowired
    private UserService userService;

    // Create a new goal
    @PostMapping
    public ResponseEntity<GoalEntity> createGoal(@RequestBody GoalDTO goalDTO) {
        // Find the user from the ID provided in the GoalDTO
        UserEntity user = userService.getUserById(goalDTO.getUserID());

        // Map GoalDTO to GoalEntity
        GoalEntity goal = new GoalEntity();
        goal.setUser(user);
        goal.setType(goalDTO.getType());
        goal.setTarget(goalDTO.getTarget());
        goal.setProgress(goalDTO.isProgress()); // Convert boolean to float
        goal.setDeadline(goalDTO.getDeadline()); // Parse String to LocalDate

        // Save and return the created goal
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