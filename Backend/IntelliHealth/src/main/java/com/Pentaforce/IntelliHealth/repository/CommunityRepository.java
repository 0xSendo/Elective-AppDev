package com.Pentaforce.IntelliHealth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Pentaforce.IntelliHealth.entity.CommunityEntity;

@Repository
public interface CommunityRepository extends JpaRepository<CommunityEntity, Integer> {
    CommunityEntity findByName(String name);
}