import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Paper, Box, Stack, Card, Snackbar, Alert, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import HomeSidebar from '../Components/HomeSidebar';

const WorkoutPlan = () => {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    duration: '',
    weeklyGoal: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchPlans = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/workoutplans');
      console.log('Fetched plans:', response.data); // Log fetched plans
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setSnackbarMessage('Failed to fetch workout plans.');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({ ...prev, [name]: value }));
  };

  const addPlan = async () => {
    if (!newPlan.duration || !newPlan.weeklyGoal) {
      setSnackbarMessage('Please fill out all fields!');
      setSnackbarOpen(true);
      return;
    }

    const newPlanData = {
      duration: newPlan.duration,
      weeklyGoal: newPlan.weeklyGoal, // Use camelCase (weeklyGoal) to match your backend
    };

    try {
      const response = await axios.post('http://localhost:8080/api/workoutplans', newPlanData);
      setPlans((prev) => [...prev, response.data]);
      setNewPlan({ duration: '', weeklyGoal: '' });
      setSnackbarMessage('Workout plan added successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error creating plan:', error);
      setSnackbarMessage('Failed to create workout plan!');
      setSnackbarOpen(true);
    }
};

  

  const saveEdit = async () => {
    if (!newPlan.duration || !newPlan.weeklyGoal) {
      setSnackbarMessage('Please fill out all fields!');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/workoutplans/${plans[editIndex].planID}`,
        newPlan
      );
      console.log("Plan updated:", response.data); // Log the updated plan
      const updatedPlans = [...plans];
      updatedPlans[editIndex] = response.data;
      setPlans(updatedPlans);
      setEditIndex(null);
      setNewPlan({ duration: '', weeklyGoal: '' });
      setSnackbarMessage('Workout plan updated successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating plan:', error.response ? error.response.data : error.message);
      setSnackbarMessage('Failed to update workout plan!');
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (index) => {
    const planID = plans[index]?.planID;
    if (!planID) {
      console.error("planID not found for deletion");
      return;
    }
  
    try {
      console.log("Deleting plan with ID:", planID); // Log the plan ID being deleted
      const response = await axios.delete(`http://localhost:8080/api/workoutplans/${planID}`);
      console.log("Plan deleted:", response); // Log the delete response
  
      // After deletion, re-fetch the plans from the backend to ensure you're working with the latest data
      fetchPlans();
  
      setSnackbarMessage('Workout plan deleted successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting plan:', error);
      setSnackbarMessage('Failed to delete workout plan!');
      setSnackbarOpen(true);
    }
  };
  

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewPlan({
      duration: plans[index].duration,
      weeklyGoal: plans[index].weeklyGoal,
    });
    console.log("Editing plan:", plans[index]); // Log the plan being edited
  };

  return (
    <Box display="flex" height="100vh" fontFamily="Roboto, sans-serif" bgcolor="#fff">
      <HomeSidebar />

      <Box flex={1} display="flex" flexDirection="row" px={10} py={5} bgcolor="#eee" boxShadow='0 4px 8px rgba(0, 0, 0, 0.1)' marginTop="100px" height="80vh" ml={30} >
        
        {/* Input Form */}
        <Box flex={1} mr={4} width={300}>
          <Typography variant="h4" fontWeight="600" color="#000" align="center" mb={3}>
            My Workout Plans
          </Typography>

          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, backgroundColor: '#fff', maxWidth: '700px', minWidth: '300px'}}>
            <Stack spacing={2}>
            <TextField
              name="duration"
              label="Duration (in minutes)"
              value={newPlan.duration}
              onChange={handleChange}
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  '&.Mui-focused': {
                    borderColor: 'transparent', // Remove focus border color
                    backgroundColor: 'transparent', // Remove any background color on focus
                  },
                },
              }}
              />
              <TextField
                name="weeklyGoal"
                label="Weekly Goal"
                value={newPlan.weeklyGoal}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
              />

              <Button
                variant="contained"
                onClick={editIndex !== null ? saveEdit : addPlan}
                sx={{ mt: 2, py: 1.5, backgroundColor: '#002366' }}
              >
                {editIndex !== null ? 'Save Plan' : 'Add Plan'}
              </Button>
            </Stack>
          </Paper>
        </Box>

        {/* Workout Plans Display */}
        <Box width="400px" maxWidth="100%" mt={4}>
          <Paper elevation={2} sx={{ bgcolor: '#002366', color: '#ffffff', p: 2, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" mb={2}>
              Things to do:
            </Typography>

            {plans.length > 0 ? (
              <Stack spacing={2}>
                {plans.map((plan, index) => (
                  <Card key={plan.planID} sx={{ bgcolor: '#ffffff', color: '#333', p: 2, borderRadius: 1 }}>
                    <Typography variant="body1" fontSize="25px" fontWeight="600" color="black">
                      Duration: {plan.duration}
                    </Typography>
                    <Typography variant="body2" fontSize="15px" >
                      Weekly Goal: {plan.weeklyGoal ? plan.weeklyGoal : 'No goal set'}
                    </Typography>

                    <IconButton
                      size="small"
                      onClick={() => handleEdit(index)}  
                      disableRipple
                      sx={{
                        justifyContent: 'right',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          color: 'inherit',
                        },
                        '&:active': {
                          backgroundColor: 'transparent',
                          boxShadow: 'none',
                        },
                        '&:focus-visible': {
                          outline: 'none',
                          boxShadow: 'none',
                        },
                        '&.MuiIconButton-root': {
                          padding: 0,
                          outline: 'none',
                          boxShadow: 'none',
                        },
                      }}
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(index)} 
                      disableRipple
                      sx={{
                        justifyContent: 'right',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          color: 'inherit',
                        },
                        '&:active': {
                          backgroundColor: 'transparent',
                          boxShadow: 'none',
                        },
                        '&:focus-visible': {
                          outline: 'none',
                          boxShadow: 'none',
                        },
                        '&.MuiIconButton-root': {
                          padding: 0,
                          outline: 'none',
                          boxShadow: 'none',
                        },
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Card>
                ))}
              </Stack>
            ) : (
              <Typography variant="body2">No workout plans added yet.</Typography>
            )}
          </Paper>
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarMessage.includes('Failed') ? 'error' : 'success'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default WorkoutPlan;
