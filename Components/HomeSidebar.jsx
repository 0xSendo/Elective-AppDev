import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  List,
  ListItem,
  Grid,
  CssBaseline,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';
import logo from '../images/logo.png'; // Your logo image
import logo1 from '../images/wlogo.png';

const HomeSidebar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state
  const [openDialog, setOpenDialog] = useState(false); // State to manage the dialog visibility
  const navigate = useNavigate();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    setLoading(true); // Show loading effect when sign-out is initiated
    setTimeout(() => {
      // Perform sign-out logic (e.g., clearing tokens, user session)
      setOpenDialog(true); // Open the sign-out confirmation dialog
      setLoading(false); // Hide loading effect
    }, 500); // Set the delay for the sign-out process
  };

  const handleDialogClose = () => {
    setOpenDialog(false); // Close the sign-out confirmation dialog without signing out
  };

  const handleConfirmSignOut = () => {
    // Perform the actual sign-out logic and navigate to login page
    setOpenDialog(false);
    navigate('/'); // Redirect to the login or home page
  };

  const handleNavigationClick = (path) => {
    setLoading(true); // Show loading icon
    setTimeout(() => {
      navigate(path); // Navigate after a short delay
      setLoading(false); // Hide loading icon
    }, 500); // Set the delay as per your requirement
  };

  const handleSettingsClick = () => {
    setLoading(true); // Show loading effect when navigating to settings
    setTimeout(() => {
      navigate('/settings'); // Navigate to settings page after the delay
      setLoading(false); // Hide loading effect
    }, 500); // Set the delay for navigation
  };

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 20px',
    color: 'white',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
    
  };

  return (
    <>
      <CssBaseline />
      <Grid container style={{ height: '100vh', overflow: 'hidden' }}>
        {/* Header */}
        <AppBar
          position="fixed"
          style={{ backgroundColor: '#021a3a', zIndex: 1201, width: '100%' }}
        >
          <Toolbar
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 16px',
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ height: '40px', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={handleProfileClick}>
                <Avatar
                  src="https://scontent.fmnl13-4.fna.fbcdn.net/v/t39.30808-1/462101278_508801152002813_5193789042383961383_n.jpg"
                  alt="Profile"
                  style={{ width: '40px', height: '40px' }}
                />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileClose}
        >
          <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>

        {/* Sidebar and Main Content */}
        <Grid container style={{ height: '100%' }}>
          {/* Sidebar */}
          <Grid
            item
            xs={3}
            style={{
              backgroundColor: '#010829',
              color: 'white',
              width: '250px',
              position: 'fixed',
              top: '64px',
              left: 0,
              paddingTop: '20px',
              overflowY: 'auto',
              height: 'calc(100vh - 64px)',
            }}
          >
            <List style={{ padding: 0, margin: 0, cursor: 'pointer' }}>
              <ListItem
                button
                style={menuItemStyle}
                onClick={() => handleNavigationClick('/hm')}
              >
                <span style={{ marginRight: '10px' }}>🏠</span> Home
              </ListItem>
              <ListItem
                button
                style={menuItemStyle}
                onClick={() => handleNavigationClick('/goal')}
              >
                <span style={{ marginRight: '10px' }}>🎯</span> Goals
              </ListItem>
              <ListItem
                button
                style={menuItemStyle}
                onClick={() => handleNavigationClick('/progress')}
              >
                <span style={{ marginRight: '10px' }}>💪</span> Progress
              </ListItem>
              <ListItem
                button
                style={menuItemStyle}
                onClick={() => handleNavigationClick('/wp')}
              >
                <span style={{ marginRight: '10px' }}>🗺️</span> Workout Plan
              </ListItem>
              <ListItem
                button
                style={menuItemStyle}
                onClick={() => handleNavigationClick('/home2')}
              >
                <span style={{ marginRight: '10px' }}>📋</span> Exercise List
              </ListItem>
            </List>
          </Grid>

          {/* Main Content */}
          <Grid
            item
            xs={9}
            style={{
              marginLeft: '250px',
              paddingTop: '84px',
              overflowY: 'auto',
              height: 'calc(100vh - 84px)',
            }}
          >
            {/* Show loading container if loading is true */}
            {loading && (
              <Box
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)', // Whitout overlay
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 1200, // To ensure it appears above other content
                }}
              >
                <img
                  src={logo1}
                  alt="Loading"
                  style={{
                    width: '50px',
                    height: '50px',
                    animation: 'rotate 1s linear infinite', // Rotating animation
                  }}
                />
              </Box>
            )}
            {/* Content goes here */}
          </Grid>
        </Grid>
      </Grid>

      {/* Sign-out Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Are you sure you want to sign out?</DialogTitle>
        <DialogContent>
          <p>Make sure you save any unsaved work before signing out.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSignOut} color="secondary">
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>

      {/* CSS for the rotation animation */}
      <style>
        {`
          @keyframes rotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
};

export default HomeSidebar;
