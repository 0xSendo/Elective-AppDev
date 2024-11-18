package com.Pentaforce.IntelliHealth.repository;

import org.springframework.stereotype.Repository;
import com.Pentaforce.IntelliHealth.entity.GoalEntity;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface GoalRepository extends JpaRepository<GoalEntity, Integer> {

}
