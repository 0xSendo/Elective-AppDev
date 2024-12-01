import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, ListItemIcon, Box, Button, Grid } from '@mui/material';
import { Edit, Lock, Delete, ArrowBack } from '@mui/icons-material';

const Settings = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/hm'); // Navigate to the "/hm" route
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', // Full viewport height
      width: '100vw',
      backgroundColor: 'white', // Set the background of the whole page to white
      margin: 0 // Remove default margin
    }}>
      <Container
        style={{
          width: '350px',  // Custom width for a smaller container
          padding: '20px',
          backgroundColor: '#021a3a',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Grid container alignItems="center" justifyContent="flex-start" spacing={1}>
          <Grid item>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={handleBack} 
              startIcon={<ArrowBack />}
              style={{
                padding: '3px 8px',  // Smaller button size
                fontSize: '0.75rem', // Smaller font size
                marginRight: '10px'
              }}
            >
              Back
            </Button>
          </Grid>
          <Grid item>
            <Typography
              variant="h4"  // Keeping the original size for the title
              component="h2"
              gutterBottom
              style={{ fontWeight: 'bold', color: 'white' }}
            >
              Settings
            </Typography>
          </Grid>
        </Grid>
        
        <List>
          <ListItem button component={Link} to="/profile">
            <ListItemIcon>
              <Edit style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText
              primary="Edit Profile"
              primaryTypographyProps={{ style: { color: '#fff' } }}
            />
          </ListItem>
          <ListItem button component={Link} to="/password">
            <ListItemIcon>
              <Lock style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText
              primary="Change Password"
              primaryTypographyProps={{ style: { color: '#fff' } }}
            />
          </ListItem>
          <ListItem button component={Link} to="/delete-account">
            <ListItemIcon>
              <Delete color="error" />
            </ListItemIcon>
            <ListItemText
              primary="Delete Account"
              primaryTypographyProps={{ style: { color: '#d32f2f' } }}
            />
          </ListItem>
        </List>
        
        <Box textAlign="center" marginTop="20px">
          <Typography variant="caption" style={{ color: '#fff' }}>
            Manage your account settings here.
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Settings;
