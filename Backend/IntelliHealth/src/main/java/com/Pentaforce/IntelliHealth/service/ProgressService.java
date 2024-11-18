package com.Pentaforce.IntelliHealth.service;

import com.Pentaforce.IntelliHealth.entity.ProgressEntity;
import com.Pentaforce.IntelliHealth.entity.UserEntity;
import com.Pentaforce.IntelliHealth.exception.UserNotFoundException;
import com.Pentaforce.IntelliHealth.repository.ProgressRepository;
import com.Pentaforce.IntelliHealth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    @Autowired
    private UserRepository userRepository;

    public ProgressEntity createProgress(int userID, ProgressEntity progress) {
        UserEntity user = userRepository.findById(userID)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userID));
        progress.setUser(user);
        return progressRepository.save(progress);
    }

    public List<ProgressEntity> getProgressByUser(int userID) {
        return progressRepository.findByUser_UserID(userID);
    }

    public Optional<ProgressEntity> getProgressById(int progressID) {
        return progressRepository.findById(progressID);
    }

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

    public void deleteProgress(int progressID) {
        if (!progressRepository.existsById(progressID)) {
            throw new IllegalArgumentException("Progress not found with ID: " + progressID);
        }
        progressRepository.deleteById(progressID);
    }
}
