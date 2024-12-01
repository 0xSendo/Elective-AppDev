package com.Pentaforce.IntelliHealth.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Pentaforce.IntelliHealth.entity.UserEntity;
import com.Pentaforce.IntelliHealth.exception.UserNotFoundException;
import com.Pentaforce.IntelliHealth.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserEntity createUser(UserEntity userEntity) {
        if (userEntity.getName() == null || userEntity.getEmail() == null || userEntity.getPassword() == null) {
            throw new IllegalArgumentException("Name, email, and password must not be null.");
        }

        if (userRepository.findByEmail(userEntity.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already in use.");
        }

        return userRepository.save(userEntity);
    }

    public UserEntity verifyLogin(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password))
                .orElse(null);
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public UserEntity getUserById(int userID) {
        return userRepository.findById(userID)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userID));
    }

    public void deleteUser(int userID) {
        UserEntity user = getUserById(userID);
        userRepository.delete(user);
    }
}
