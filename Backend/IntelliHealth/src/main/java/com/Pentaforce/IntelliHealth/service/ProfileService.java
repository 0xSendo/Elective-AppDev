package com.Pentaforce.IntelliHealth.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Pentaforce.IntelliHealth.entity.ProfileEntity;
import com.Pentaforce.IntelliHealth.repository.ProfileRepository;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    // Create or update profile
    public ProfileEntity createProfile(ProfileEntity profileEntity) {
        try {
            return profileRepository.save(profileEntity);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            throw new RuntimeException("Error saving profile: " + e.getMessage());
        }
    }
    

    // Get profile by profileID
    public ProfileEntity getProfileById(int profileID) {
        return profileRepository.findById(profileID)
                .orElseThrow(() -> new RuntimeException("Profile not found with ID: " + profileID));
    }

    // Get all profiles
    public List<ProfileEntity> getAllProfiles() {
        return profileRepository.findAll();
    }

    // Delete profile by profileID
    public void deleteProfile(int profileID) {
        ProfileEntity profile = getProfileById(profileID);
        profileRepository.delete(profile);
    }
}
