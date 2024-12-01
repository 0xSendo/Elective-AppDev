package com.Pentaforce.IntelliHealth.service;

import com.Pentaforce.IntelliHealth.entity.ProgressEntity;
import com.Pentaforce.IntelliHealth.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    // Create a new progress entry
    public ProgressEntity createProgress(ProgressEntity progress) {
        return progressRepository.save(progress);
    }

    // Get all progress entries
    public List<ProgressEntity> getAllProgress() {
        return progressRepository.findAll();
    }

    // Get a specific progress entry by ID
    public Optional<ProgressEntity> getProgressById(int progressID) {
        return progressRepository.findById(progressID);
    }

    // Update a progress entry
    @Transactional
    public ProgressEntity updateProgress(int progressID, ProgressEntity progressDetails) {
        return progressRepository.findById(progressID)
                .map(progress -> {
                    progress.setDate(progressDetails.getDate());
                    progress.setWeight(progressDetails.getWeight());
                    return progressRepository.save(progress);
                })
                .orElseThrow(() -> new IllegalArgumentException("Progress not found with ID: " + progressID));
    }

    // Delete a progress entry
    public void deleteProgress(int progressID) {
        if (!progressRepository.existsById(progressID)) {
            throw new IllegalArgumentException("Progress not found with ID: " + progressID);
        }
        progressRepository.deleteById(progressID);
    }
}
