import React, { useState, useEffect } from 'react';
import { loginUser, signUpUser, createProfile } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const navigate = useNavigate();
  // Retrieve user data (assuming this is saved during signup)
  const storedUser = localStorage.getItem('user');
  const user = JSON.parse(storedUser) || { name: 'User', email: 'user@example.com' };
  // Fetch the user profile from localStorage
  const storedProfile = localStorage.getItem('userProfile');
  const initialProfile = storedProfile
    ? JSON.parse(storedProfile)
    : { name: '', email: '', password: '', gender: '', fitnessLevel: '', weight: '', height: '', weightGoal: '' };
  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);

  // Sync with localStorage on component mount
  useEffect(() => {
    const updatedProfile = localStorage.getItem('userProfile');
    if (updatedProfile) {
      setProfile(JSON.parse(updatedProfile));
    }
  }, []);

  const handleEditToggle = () => {
    setEditMode((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleUpdateProfile = () => {
    // Save the updated profile to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setEditMode(false); // Exit edit mode
  };

  const handleFinish = async (e) => {
    e.preventDefault();
      const profileData = {
            name: profile.name,
            email: user.email, 
            password: profile.password,
            fitnessLevel: profile.fitnessLevel,
            gender: profile.gender,
            weight: profile.weight,
            height: profile.height,
            weightGoal: profile.weightGoal,
            id: user.id,
        };

        // Use the createProfile function from apiService.js to post profile data
        try {
          const response = await createProfile(profileData);
          console.log('Profile saved:', response); // Optional: log the response
          alert('Profile saved successfully');
          navigate('/home2'); // Redirect to HomePage2
        } catch (error) {
        console.error('Error saving profile:', error);
        alert('There was an error saving your profile. Please try again.');
    }
};

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <h2>Your Profile</h2>
      <div>
        <span>Fitness Level: </span>
        {editMode ? (
          <select
            name="fitnessLevel"
            value={profile.fitnessLevel}
            onChange={handleChange}
          >
            <option value="">Select a level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        ) : (
          <span>{profile.fitnessLevel || 'Not set'}</span>
        )}
      </div>

      <div>
        <span>Weight: </span>
        {editMode ? (
          <input
            type="number"
            name="weight"
            value={profile.weight}
            onChange={handleChange}
          />
        ) : (
          <span>{profile.weight ? `${profile.weight} kg` : 'Not set'}</span>
        )}
      </div>
      <div>
        <span>Height: </span>
        {editMode ? (
          <input
            type="number"
            name="height"
            value={profile.height}
            onChange={handleChange}
          />
        ) : (
          <span>{profile.height ? `${profile.height} cm` : 'Not set'}</span>
        )}
      </div>
      <div>
        <span>Goal Weight: </span>
        {editMode ? (
          <input
            type="number"
            name="weightGoal"
            value={profile.weightGoal}
            onChange={handleChange}
          />
        ) : (
          <span>{profile.goalWeight ? `${profile.goalWeight} kg` : 'Not set'}</span>
        )}
      </div>
      <button
        onClick={editMode ? handleUpdateProfile : handleEditToggle}
        style={{ fontSize: '12px', padding: '6px 12px', marginTop: '20px' }}
      >
        {editMode ? 'Save Profile' : 'Edit Profile'}
      </button>
      <button
        onClick={handleFinish}
        style={{ fontSize: '12px', padding: '6px 12px', marginTop: '20px', marginLeft: '10px' }}
      >
        Finish
      </button>
    </div>
  );
};

export default HomePage;
