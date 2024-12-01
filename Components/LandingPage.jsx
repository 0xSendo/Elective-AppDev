import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid, CardMedia } from '@mui/material';
import wlogo from '../images/wlogo.png'; 

const LandingPage = () => {
  const navigate = useNavigate();

  // List of GIF URLs
  const gifList = [
    'https://d2w9rnfcy7mm78.cloudfront.net/20123634/original_603a3a7a1e06dead8c2838f090575ff1.gif?1675116798',
    'https://i.makeagif.com/media/10-12-2015/bcPmCt.gif',
    'https://i.makeagif.com/media/10-12-2015/z0QURe.gif',
    'https://i.makeagif.com/media/4-20-2022/hL1t1P.gif',
  ];

  // State to track the current GIF
  const [currentGif, setCurrentGif] = useState(gifList[0]);

  useEffect(() => {
    // Function to change GIF every 7 seconds
    const intervalId = setInterval(() => {
      setCurrentGif((prevGif) => {
        const currentIndex = gifList.indexOf(prevGif);
        const nextIndex = (currentIndex + 1) % gifList.length;
        return gifList[nextIndex];
      });
    }, 7000); // Change GIF every 7 seconds

    // Cleanup interval when component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs only once after initial render

  return (
    <Box display="flex" flexDirection="column" height="100vh" sx={{ backgroundColor: '#eee' }}>
      {/* Top Section: Logo */}
      <Box sx={{ position: 'absolute', top: '20px', left: '40px' }}>
        <img
          src={wlogo} // Replace with your logo URL
          alt="Logo"
          style={{ maxWidth: '80px', cursor: 'pointer' }}
          onClick={() => navigate('/')} // Optional: Redirect to home when clicked
        />
      </Box>

      {/* Main Content */}
      <Grid container sx={{ flex: 1 }}>
        {/* Left Section: Text */}
        <Grid item xs={12} md={6} display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start" p={4}>
          <Box textAlign="left">
            <Typography variant="h3" fontWeight="bold" gutterBottom color="#021a3a">
              Welcome to IntelliHealth, Your Personalized Health & Fitness Hub!
            </Typography>
            <Typography variant="h5" paragraph color="#021a3a">
              At IntelliHealth, we aim to provide customized workout plans to help you achieve your fitness goals.
              Whether you’re a beginner just starting your journey or a professional athlete, we have something tailored just for you!
            </Typography>
            <Typography variant="h6" paragraph color="#021a3a">
              Our goal is to promote sustainable and healthy living by offering guidance and workout routines that fit your lifestyle.
              Join us today and embark on a transformative fitness experience!
            </Typography>
          </Box>
        </Grid>

        {/* Right Section: GIF and Buttons */}
        <Grid item xs={12} md={6} display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={4}>
          <Box width="95%" mb={4}>
            <CardMedia
              component="img"
              image={currentGif}
              alt="Fitness Journey"
              sx={{ borderRadius: 2, boxShadow: 1 }}
            />
          </Box>
          <Box 
                display="flex" 
                flexDirection="row" 
                alignItems="center" 
                sx={{ 
                  position: 'absolute', 
                  top: '30px', 
                  right: '50px', 
                  gap: 2 
                }}
              >
                
                {/* Sign In Button */}
                <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/login2')}
                    sx={{
                      color: '#021a3a',
                      borderColor: '#021a3a',
                      padding: '10px 20px', // Consistent padding
                      minWidth: '120px',    // Ensures consistent width
                      '&:hover': {
                        backgroundColor: '#021a3a',
                        color: '#fff',
                      },
                    }}
                  >
                  Sign In
                </Button>

                {/* Sign Up Button */}
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/signup')}
                  sx={{
                    backgroundColor: '#021a3a',
                    color: '#fff',
                    padding: '10px 20px', // Consistent padding
                    minWidth: '120px',    // Ensures consistent width
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#021a3a'
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Box>

              </Grid>
            </Grid>
          </Box>
  );
};

export default LandingPage;
