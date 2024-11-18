import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Ensure you're using the same CSS file

import axios from 'axios';

const ProfileInput = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [profile, setProfile] = useState({
    fitnessLevel: '',
    weight: '',
    height: '',
    goalWeight: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault(); 
    localStorage.setItem('userProfile', JSON.stringify(profile));
    navigate('/home');  // Navigate to home after saving the profile
  

// try{
//   const response = await axios.put(`http://localhost:8080/api/users/profile`, requestBody );
  
//   console.log('Saved the data!', response.data);
//   if(response.status === 200){
//     navigate('/home');
//   }
// }
// catch (error){
//   if(error.response){
//     console.error('Error response:', error.response.data);
//     setError(error.response.status === 401
//       ? 'Input Failed.'
//       : `${error.response.data.message}` );
//   }
  
// }
try {
  const response = await axios.put(
    'http://localhost:8080/api/users/profile/userID', // URL
    profile, // Data to be updated (e.g., the user's profile)
    {
      headers: {
        'Content-Type': 'application/json', // Specify JSON content
        Authorization: `Bearer ${localStorage.getItem('token')}` // Example if using authentication
      },
    }
  );

  console.log('Profile updated successfully!', response.data);
  if (response.status === 200) {
    navigate('/home');
  }
} catch (error) {
  if (error.response) {
    console.error('Error response:', error.response.data);
    setError(
      error.response.status === 401
        ? 'Input Failed.'
        : `${error.response.data.message}`
    );
  }
}

  };
  return (
    <div className="form-container"> {/* Use the same container class */}
      <form className="form-content" onSubmit={handleSaveProfile}> {/* Use the same form class */}
        <h2>Complete Your Profile</h2>
        
        <div className="input-group">
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            onChange={handleChange}
            value={profile.gender}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            name="fitnessLevel"
            placeholder="Fitness Level"
            onChange={handleChange}
            value={profile.fitnessLevel}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            onChange={handleChange}
            value={profile.weight}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            onChange={handleChange}
            value={profile.height}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            name="goalWeight"
            placeholder="Goal Weight (kg)"
            onChange={handleChange}
            value={profile.goalWeight}
            required
          />
        </div>
        <button type="submit">Save and Proceed</button>
      </form>
    </div>
  );
};

export default ProfileInput;
