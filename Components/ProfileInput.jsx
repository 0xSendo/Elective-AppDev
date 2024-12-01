import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Box, TextField, Button, CircularProgress, Alert, Grid, InputLabel, MenuItem, Select, FormControl, FormHelperText, IconButton, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const ProfileInput = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    profile_picture: null,
  });
  
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [savedProfile, setSavedProfile] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const MAX_PROFILE_PICTURE_SIZE = 2 * 1024 * 1024; // 2MB limit
  const navigate = useNavigate(); 

  // Handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfileData({
      ...profileData,
      profile_picture: file ? file : null,
    });

    // Display the preview of the image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicturePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle input changes for other fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Function to save the profile
  const handleSaveProfile = async () => {
    if (profileData.profile_picture && profileData.profile_picture.size > MAX_PROFILE_PICTURE_SIZE) {
      setAlertMessage("Profile picture is too large! Maximum size is 2MB.");
      setAlertType('error');
      return;
    }

    const data = { ...profileData };
    if (!data.profile_picture) {
      delete data.profile_picture;
    }

    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:8080/api/profiles', data);
      console.log("Profile saved successfully:", response.data);

      setSavedProfile(response.data);
      setIsPopupVisible(true);
      setAlertMessage("Profile saved successfully!");
      setAlertType('success');
    } catch (error) {
      console.error("Error saving profile:", error);
      setAlertMessage("Error saving profile. Please try again.");
      setAlertType('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit button
  const handleEditProfile = () => {
    setIsPopupVisible(false);
  };

  // Handle finish button
  const handleFinishProfile = () => {
    setIsPopupVisible(false);
    setAlertMessage("Profile saved and finished!");
    setAlertType('success');
    navigate('/home');
  };

  // Inline styles for alert message
  const alertStyles = {
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '5px',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: alertType === 'error' ? '#f44336' : '#4CAF50',
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', minWidth: '210vh', backgroundColor: '#eee', padding: '40px' }}>
      <Box
        component="form"
        onSubmit={(e) => e.preventDefault()}
        sx={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: 4,
          boxShadow: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Profile Picture and Greeting Message */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 3, width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginRight: 2 }}>
            <IconButton
              component="label"
              htmlFor="profilePicture"
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                backgroundColor: '#1976d2',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                border: '2px solid transparent',
                transition: 'border 0.3s ease',
                '&:hover': { backgroundColor: '#021a3a' },
              }}
            >
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleProfilePictureChange}
                style={{ display: 'none' }}
              />
              {profilePicturePreview ? (
                <img
                  src={profilePicturePreview}
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <AddIcon sx={{ color: 'white' }} />
              )}
            </IconButton>
          </Box>

          {/* Greeting Message */}
          <Box>
            <Typography variant="h5" sx={{ marginBottom: 1, color: 'black' }}>
              Hi! Let's complete your profile.
            </Typography>
          </Box>
        </Box>

        {/* Form Inputs */}
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={profileData.firstName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={profileData.lastName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Age"
              name="age"
              type="number"
              value={profileData.age}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                name="gender"
                value={profileData.gender}
                onChange={handleChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Height (cm)"
              name="height"
              type="number"
              value={profileData.height}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Weight (kg)"
              name="weight"
              type="number"
              value={profileData.weight}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Save Profile Button */}
        <Button
          type="button"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            padding: '10px',
            fontWeight: 'bold',
            marginTop: 3,
            textTransform: 'none',
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#021a3a' },
          }}
          onClick={handleSaveProfile}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Save Profile'}
        </Button>

        {/* Alert */}
        {alertMessage && (
          <Alert severity={alertType} sx={{ mt: 2 }}>
            {alertMessage}
          </Alert>
        )}
      </Box>

      {/* Popup for saved profile */}
      {isPopupVisible && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', maxWidth: '400px', width: '100%', textAlign: 'center', color: 'black', zIndex: 10000, }}>
            <h2>Saved Profile</h2>
            <p><strong>First Name:</strong> {savedProfile.firstName}</p>
            <p><strong>Last Name:</strong> {savedProfile.lastName}</p>
            <p><strong>Age:</strong> {savedProfile.age}</p>
            <p><strong>Gender:</strong> {savedProfile.gender}</p>
            <p><strong>Height:</strong> {savedProfile.height}</p>
            <p><strong>Weight:</strong> {savedProfile.weight}</p>
            {savedProfile.profile_picture && <img src={savedProfile.profile_picture} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />}
            <div style={{ marginTop: '20px' }}>
              <Button variant="contained" color="primary" onClick={handleEditProfile}>Edit</Button>
              <Button variant="contained" color="secondary" onClick={handleFinishProfile} style={{ marginLeft: '10px' }}>Finish</Button>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default ProfileInput;
