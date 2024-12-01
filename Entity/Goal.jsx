import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Card,
  Snackbar,
  Alert,
  Box,
  Paper,
  Stack,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import HomeSidebar from '../Components/HomeSidebar';

const Goal = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ target: '', deadline: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [goalIdToEdit, setGoalIdToEdit] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/goals');
        console.log('Fetched goals:', response.data);
        setGoals(response.data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };
    fetchGoals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

const addGoal = async () => {
  if (!newGoal.target || !newGoal.deadline) {
    setSnackbarMessage('Please fill out all fields!');
    setSnackbarOpen(true);
    return;
  }

  try {
    const response = await axios.post('http://localhost:8080/api/goals', {
      target: newGoal.target,
      deadline: newGoal.deadline, // Ensure this matches the backend data type
    });
    setGoals([...goals, response.data]);
    setNewGoal({ target: '', deadline: '' });
    setSnackbarMessage('Goal added successfully!');
  } catch (error) {
    console.error('Error adding goal:', error);
    setSnackbarMessage(error.response?.data?.message || 'Failed to add goal!');
  } finally {
    setSnackbarOpen(true);
  }
};

  const updateGoal = async () => {
    if (!newGoal.target || !newGoal.deadline) {
      setSnackbarMessage('Please fill out all fields!');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/goals/${goalIdToEdit}`,
        newGoal
      );
      setGoals(goals.map((goal) => (goal.goalID === goalIdToEdit ? response.data : goal)));
      setNewGoal({ target: '', deadline: '' });
      setIsEditing(false);
      setGoalIdToEdit(null);
      setSnackbarMessage('Goal updated successfully!');
    } catch (error) {
      console.error('Error updating goal:', error);
      setSnackbarMessage('Failed to update goal!');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleEdit = (goal) => {
    setNewGoal({ target: goal.target, deadline: goal.deadline });
    setIsEditing(true);
    setGoalIdToEdit(goal.goalID);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/goals/${id}`);
      setGoals(goals.filter((goal) => goal.goalID !== id));
      setSnackbarMessage('Goal deleted successfully!');
    } catch (error) {
      console.error('Error deleting goal:', error);
      setSnackbarMessage('Failed to delete goal!');
    } finally {
      setSnackbarOpen(true);
    }
  };

  return (
    <Box display="flex" height="100vh" fontFamily="Roboto, sans-serif" bgcolor="#fff">
      <HomeSidebar />
      <Box flex={1} display="flex" flexDirection="row" px={10} py={5} bgcolor="#eee" boxShadow='0 4px 8px rgba(0, 0, 0, 0.1)' marginTop="100px" height="80vh" ml={30} >
        {/* Form to Add or Edit Goals */}
        <Box flex={1} mr={4}>
          <Typography variant="h4" fontWeight="600" color="#000" align="center" mb={3}>
            My Goals
          </Typography>
          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, backgroundColor: '#fff', maxWidth: '600px', minWidth: '300px' }}>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Goal Target</InputLabel>
                <Select name="target" value={newGoal.target || ''} onChange={handleChange} label="Goal Target">
                  <MenuItem value="" disabled>
                    Select Goal Target
                  </MenuItem>
                  <MenuItem value="Gain Muscle">Gain Muscle</MenuItem>
                  <MenuItem value="Lose Weight">Lose Weight</MenuItem>
                </Select>
              </FormControl>
              <TextField
                name="deadline"
                label="Deadline"
                type="date"
                value={newGoal.deadline}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <Button variant="contained" onClick={isEditing ? updateGoal : addGoal} sx={{ mt: 2, py: 1.5, backgroundColor: '#002366' }}>
                {isEditing ? 'Update Goal' : 'Add Goal'}
              </Button>
            </Stack>
          </Paper>
        </Box>

        {/* Display List of Goals */}
        <Box width="400px" maxWidth="100%" mt={4}>
        <Paper elevation={2} sx={{ bgcolor: '#002366', color: '#ffffff', p: 2, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" mb={2}>
                My Goals
            </Typography>
            {goals.length > 0 ? (
                <Stack spacing={2}>
                    {goals.map((goal) => (
                        <Card key={goal.goalID} sx={{ bgcolor: '#ffffff', color: '#333', p: 2, borderRadius: 1 }}>
                            <Typography variant="body1" fontSize="25px" fontWeight="600" color="black">
                                Target: {goal.target}
                            </Typography>
                            <Typography variant="body2" fontSize="15px">
                                Deadline: {goal.deadline}
                            </Typography>
                            <IconButton
                                size="small"
                                onClick={() => handleEdit(goal)}
                                disableRipple
                                sx={{
                                    justifyContent: 'right',
                                    backgroundColor: 'transparent', // No background color
                                    '&:hover': {
                                        backgroundColor: 'transparent', // No hover background
                                        color: 'inherit', // Keep the color as is while hovering
                                    },
                                    '&:active': {
                                        backgroundColor: 'transparent', // Remove active background
                                        boxShadow: 'none', // Remove active click shadow
                                    },
                                    '&:focus-visible': {
                                        outline: 'none', // Remove the focus ring
                                        boxShadow: 'none', // Remove any focus-related shadow
                                    },
                                    '&.MuiIconButton-root': {
                                        padding: 0, // Ensure there is no padding around the icon
                                        outline: 'none', // Force remove any focus outline
                                        boxShadow: 'none', // Force remove shadow on focus/click
                                    },
                                }}
                            >
                                <Edit />
                            </IconButton>

                            <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDelete(goal.goalID)}
                                disableRipple
                                sx={{
                                    justifyContent: 'right',
                                    backgroundColor: 'transparent', // No background color
                                    '&:hover': {
                                        backgroundColor: 'transparent', // No hover background
                                        color: 'inherit',
                                    },
                                    '&:active': {
                                        backgroundColor: 'transparent', // Remove active background
                                        boxShadow: 'none', // Remove active click shadow
                                    },
                                    '&:focus-visible': {
                                      outline: 'none', // Remove the focus ring
                                      boxShadow: 'none', // Remove any focus-related shadow
                                    },
                                    '&.MuiIconButton-root': {
                                        padding: 0, // Ensure there is no padding around the icon
                                        outline: 'none', // Force remove any focus outline
                                        boxShadow: 'none', // Force remove shadow on focus/click
                                    },

                                }}
                            >
                                <Delete />
                            </IconButton>
                        </Card>
                    ))}
                </Stack>
            ) : (
                <Typography variant="body2">No goals added yet.</Typography>
            )}
        </Paper>
        </Box>
      </Box>

      {/* Snackbar for Feedback */}
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarMessage.includes('Failed') ? 'error' : 'success'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Goal;
