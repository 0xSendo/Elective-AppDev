package com.Pentaforce.IntelliHealth.repository;

import com.Pentaforce.IntelliHealth.entity.ExerciseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseRepository extends JpaRepository<ExerciseEntity, Long> {
}
