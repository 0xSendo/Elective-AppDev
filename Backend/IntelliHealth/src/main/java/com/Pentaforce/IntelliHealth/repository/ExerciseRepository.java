package com.Pentaforce.IntelliHealth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Pentaforce.IntelliHealth.entity.ExerciseEntity;

@Repository
public interface ExerciseRepository extends JpaRepository<ExerciseEntity, Integer> {
}
