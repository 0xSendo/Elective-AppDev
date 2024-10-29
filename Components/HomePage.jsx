import React, { useState } from 'react';

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const storedProfile = localStorage.getItem('userProfile');
  const initialProfile = storedProfile ? JSON.parse(storedProfile) : {};

  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false); 

  const handleEditToggle = () => {
    setEditMode((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleUpdateProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setEditMode(false); 
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <h2>Your Profile</h2>
      
      <div>
        <span>Fitness Level:</span>
        {editMode ? (
          <input
            type="text"
            name="fitnessLevel"
            value={profile.fitnessLevel}
            onChange={handleChange}
          />
        ) : (
          <span>{profile?.fitnessLevel}</span>
        )}
      </div>

      <div>
        <span>Weight:</span>
        {editMode ? (
          <input
            type="number"
            name="weight"
            value={profile.weight}
            onChange={handleChange}
          />
        ) : (
          <span>{profile?.weight} kg</span>
        )}
      </div>

      <div>
        <span>Height:</span>
        {editMode ? (
          <input
            type="number"
            name="height"
            value={profile.height}
            onChange={handleChange}
          />
        ) : (
          <span>{profile?.height} cm</span>
        )}
      </div>

      <div>
        <span>Goal Weight:</span>
        {editMode ? (
          <input
            type="number"
            name="goalWeight"
            value={profile.goalWeight}
            onChange={handleChange}
          />
        ) : (
          <span>{profile?.goalWeight} kg</span>
        )}
      </div>

      <button 
        onClick={editMode ? handleUpdateProfile : handleEditToggle}
        style={{ fontSize: '12px', padding: '6px 12px', marginTop: '20px' }}
      >
        {editMode ? 'Save Profile' : 'Edit Profile'}
      </button>
    </div>
  );
};

export default HomePage;
