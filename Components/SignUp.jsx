import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ex2 from '../images/ex2.jpg'; // Same image as login page
import wlogo from '../images/wlogo.png'; // Same logo as login page
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/users/signUp', signUpData);
      if (response.status === 201) {
        const userId = response.data.userId;
        localStorage.setItem('user', JSON.stringify({ id: userId }));
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        setError('Sign Up Failed. Please check your input.');
      } else {
        setError('Sign Up failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#eee', 
        minHeight: '100vh',
        minWidth: '210vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          width: '80%',
          maxWidth: 1100,
          height: 600,
          borderRadius: 6,
          overflow: 'hidden',
        }}
      >
        {/* Left Side - Image */}
        <Box
          component="img"
          src={ex2} // Same image as login page
          alt="Fitness Illustration"
          sx={{
            width: '50%',
            objectFit: 'cover',
            borderRadius: '6px 0 0 6px',
          }}
        />

        {/* Right Side - Form */}
        <Box
          sx={{
            flex: 1,
            px: 4,
            py: 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'black',
              fontWeight: 'bold',
              mb: 3,
            }}
          >
            {/* Logo */}
            <Box
              component="img"
              src={wlogo} // Path to logo image
              alt="Logo"
              sx={{
                height: 40,
                width: 'auto',
                mr: 1, // Margin between logo and text
              }}
            />
            Sign Up
          </Typography>

          <Box component="form" onSubmit={handleSignUpSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
              label="Name"
              name="name"
              value={signUpData.name}
              onChange={handleSignUpChange}
              required
              margin="normal"
              variant="outlined"
              InputProps={{
                sx: { backgroundColor: '#f9f9f9', display: 'flex', margin: '0 auto', width: '350px' },
              }}
            />
            <TextField
              label="Email"
              name="email"
              value={signUpData.email}
              onChange={handleSignUpChange}
              required
              margin="normal"
              variant="outlined"
              InputProps={{
                sx: { backgroundColor: '#f9f9f9', display: 'flex', margin: '0 auto', width: '350px' },
              }}
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={signUpData.password}
              onChange={handleSignUpChange}
              required
              margin="normal"
              variant="outlined"
              InputProps={{
                sx: { backgroundColor: '#f9f9f9', display: 'flex', margin: '0 auto', width: '350px' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              sx={{
                mt: 8,
                px: 4,
                py: 1.5,
                width: '50%',
                textTransform: 'none',
                fontWeight: 'bold',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#021a3a',
                },
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block',
              }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
            </Button>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Box>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account? <Link to="/login">Login here</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUp;
