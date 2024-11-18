import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  // Retrieve user data (assuming this is saved during signup)
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'User', email: 'user@example.com' };
  // Fetch the user profile from localStorage
  const storedProfile = localStorage.getItem('userProfile');
  const initialProfile = storedProfile
    ? JSON.parse(storedProfile)
    : { fitnessLevel: '', weight: '', height: '', goalWeight: '' };
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

  const handleFinish = () => {
    navigate('/home3'); // Redirect to HomePage3
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.welcomeText}>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <h2>Your Profile</h2>
      <div style={styles.profileDetail}>
        <span>Fitness Level: </span>
        {editMode ? (
          <input
            type="text"
            name="fitnessLevel"
            value={profile.fitnessLevel}
            onChange={handleChange}
            style={styles.input}
          />
        ) : (
          <span>{profile.fitnessLevel || 'Not set'}</span>
        )}
      </div>
      <div style={styles.profileDetail}>
        <span>Gender: </span>
        {editMode ? (
          <input
            type="text"
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            style={styles.input}
          />
        ) : (
          <span>{profile.gender || 'Not set'}</span>
        )}
      </div>
      <div style={styles.profileDetail}>
        <span>Weight: </span>
        {editMode ? (
          <input
            type="number"
            name="weight"
            value={profile.weight}
            onChange={handleChange}
            style={styles.input}
          />
        ) : (
          <span>{profile.weight ? `${profile.weight} kg` : 'Not set'}</span>
        )}
      </div>
      <div style={styles.profileDetail}>
        <span>Height: </span>
        {editMode ? (
          <input
            type="number"
            name="height"
            value={profile.height}
            onChange={handleChange}
            style={styles.input}
          />
        ) : (
          <span>{profile.height ? `${profile.height} cm` : 'Not set'}</span>
        )}
      </div>
      <div style={styles.profileDetail}>
        <span>Goal Weight: </span>
        {editMode ? (
          <input
            type="number"
            name="goalWeight"
            value={profile.goalWeight}
            onChange={handleChange}
            style={styles.input}
          />
        ) : (
          <span>{profile.goalWeight ? `${profile.goalWeight} kg` : 'Not set'}</span>
        )}
      </div>
      <div style={styles.buttonContainer}>
        <button
          onClick={editMode ? handleUpdateProfile : handleEditToggle}
          style={styles.button}
        >
          {editMode ? 'Save Profile' : 'Edit Profile'}
        </button>
        <button
          onClick={handleFinish}
          style={{ ...styles.button, marginLeft: '10px' }}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

// Simple styles for container and profile section
const styles = {
  container: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: 'auto',
    textAlign: 'center',
  },
  welcomeText: {
    color: '#1e203b', // Updated color for Welcome text
  },
  profileDetail: {
    margin: '10px 0',
    fontSize: '16px',
    color: '#333',
  },
  input: {
    marginLeft: '10px',
    padding: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '120px',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
    padding: '8px 15px',
    fontSize: '14px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default HomePage;
