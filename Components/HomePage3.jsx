import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const HomePage3 = () => {
  const navigate = useNavigate();

  // Set the body background color when the component mounts
  useEffect(() => {
    document.body.style.backgroundColor = 'white'; // Set body background color to white
    document.body.style.color = '#FFF'; // Ensure text color is white for contrast
    document.body.style.margin = '0'; // Remove default margin to ensure proper centering
    document.body.style.height = '100vh'; // Make body full viewport height
    return () => {
      document.body.style.backgroundColor = ''; // Reset on component unmount
      document.body.style.color = ''; // Reset text color
      document.body.style.margin = ''; // Reset margin
      document.body.style.height = ''; // Reset height
    };
  }, []);

  const handleGetStarted = () => {
    navigate('/hm'); // Navigate to HomePage2
  };

  return (
    <Box
      sx={{
        position: 'absolute', // Use absolute positioning to ensure the Box covers the entire viewport
        top: 0,
        left: 0,
        width: '100vw', // Full viewport width
        height: '100vh', // Full viewport height
        display: 'flex',
        justifyContent: 'center', // Horizontally center
        alignItems: 'center', // Vertically center
        backgroundColor: 'white', // Set page background color to white
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column', // Stack content vertically
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          p: 3,
          backgroundColor: '#021a3a', // Set box background color to #021a3a
          width: '100%',
          maxWidth: '600px',
          borderRadius: 2,
          color: '#fff', // Set text color to white
          boxShadow: 3, // Add a shadow for better contrast
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome to Your Fitness Journey!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#fff', // Set text color to white
            fontSize: '1.2rem',
            mt: 3,
            mb: 2,
          }}
        >
          Achieve your goals with personalized workouts, expert nutrition advice, and a supportive community.
        </Typography>
        <Button
          onClick={handleGetStarted}
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            textTransform: 'none',
            borderRadius: 2,
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage3;
