package com.Pentaforce.IntelliHealth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.Pentaforce.IntelliHealth.entity.WorkoutEntity;

@Repository
public interface WorkoutRepository extends JpaRepository<WorkoutEntity, Integer> {

}

// package com.Pentaforce.IntelliHealth.repository;

// import com.Pentaforce.IntelliHealth.entity.Workout;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// @Repository
// public interface WorkoutRepository extends JpaRepository<Workout, Integer> {
// // Additional custom queries can be added here if needed
// }
