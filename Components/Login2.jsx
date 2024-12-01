import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ex1 from '../images/ex1.jpg';
import wlogo from '../images/wlogo.png';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showLogoLoading, setShowLogoLoading] = useState(false);
  const [error, setError] = useState('');
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const requestBody = {
      email: signInData.email.trim().toLowerCase(),
      password: signInData.password,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', requestBody);
      if (response.status === 200) {
        setShowLogoLoading(true); // Show rotating logo
        const userId = response.data.userId;
        localStorage.setItem('user', JSON.stringify({ id: userId }));

        // Delay navigation to show the logo spinning
        setTimeout(() => {
          navigate('/hm');
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        setError(
          error.response.status === 401
            ? 'Sign In failed: Unauthorized. Please check your credentials.'
            : `Sign In Failed: ${error.response.data.message}`
        );
      } else {
        setError('Sign In failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility
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
      {showLogoLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999,
          }}
        >
          <Box
            component="img"
            src={wlogo}
            alt="Loading"
            sx={{
              height: 100,
              width: 100,
              animation: 'spin 2s linear infinite',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              marginTop: 2,
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            Signing You In...
          </Typography>
        </Box>
      )}

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
          src={ex1}
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
            <Box
              component="img"
              src={wlogo}
              alt="Logo"
              sx={{
                height: 40,
                width: 'auto',
                mr: 1,
              }}
            />
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSignInSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextField
              label="Email"
              name="email"
              value={signInData.email}
              onChange={handleSignInChange}
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
              type={showPassword ? 'text' : 'password'}  // Toggle password visibility
              value={signInData.password}
              onChange={handleSignInChange}
              required
              margin="normal"
              variant="outlined"
              InputProps={{
                sx: { backgroundColor: '#f9f9f9', display: 'flex', margin: '0 auto', width: '350px' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
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
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Box>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </Typography>
        </Box>
      </Paper>

      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Login;
