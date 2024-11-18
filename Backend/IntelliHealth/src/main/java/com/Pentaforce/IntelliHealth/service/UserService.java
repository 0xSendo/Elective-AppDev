package com.Pentaforce.IntelliHealth.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Pentaforce.IntelliHealth.entity.UserEntity;
import com.Pentaforce.IntelliHealth.exception.UserNotFoundException;
import com.Pentaforce.IntelliHealth.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // @Autowired
    // private BCryptPasswordEncoder passwordEncoder; // Use BCrypt for password hashing

    public UserEntity createProfile(UserEntity userEntity) {
        //System.out.println("Attempting to create user with email: " + userEntity.getEmail());

        if (userEntity.getName() == null || userEntity.getEmail() == null || userEntity.getPassword() == null) {
            throw new IllegalArgumentException("Name, email, and password must not be null");
        }
        
        if (userRepository.findByEmail(userEntity.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already in use");
        }

        //System.out.println("Attempting to save user: " + userEntity);
        //user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash the password
        //UserEntity savedUser = userRepository.save(userEntity);

        //System.out.println("User with ID: " + savedUser.getUserId());
        return userRepository.save(userEntity);
    }

    public UserEntity verifyLogin(String email, String password) {
        UserEntity user = userRepository.findByEmail(email).orElse(null);
        
        // Check if the user exists and if the password matches
        if (user != null && user.getPassword().equals(password)) {
            return user; // Return the user if login is successful
        }
        return null; // No match found
    }
    
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }
    
    public UserEntity getUserById(Integer userID) {
        return userRepository.findById(userID)
            .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userID));
    }

    @Transactional
    public UserEntity updateUser(Integer userID, UserEntity userDetails) {
        return userRepository.findById(userID)
            .map(user -> {
                user.setName(userDetails.getName());
                user.setEmail(userDetails.getEmail());
                 // user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
                user.setGender(userDetails.getGender());
                user.setFitnessLevel(userDetails.getFitnessLevel());
                user.setWeight(userDetails.getWeight());
                user.setHeight(userDetails.getHeight());
                user.setWeightGoal(userDetails.getWeightGoal());
                return userRepository.save(user);
            })
            .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userID));
    }

    @Transactional
    public void deleteUser(Integer userID) {
        UserEntity existingUser = getUserById(userID);
        userRepository.delete(existingUser);
    }
    
}
