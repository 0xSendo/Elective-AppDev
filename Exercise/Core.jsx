import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//muis
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  TextField,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';

//connection to backend
import axios from 'axios';

const Core = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [newExerciseCore, setNewExerciseCore] = useState({
    category: 'Core',
    name: '',
    description: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
    setNewExerciseCore({
      category: 'Core',
      name: '',
      description: '',
    });
    setError('');
  };

  const handleSubmit = async () => {
    if (!newExerciseCore.name || !newExerciseCore.description) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/exercises', {
        category: 'Core',
        name: newExerciseCore.name,
        description: newExerciseCore.description,
      });
      console.log('Feedback submitted successfully', response.data);
      setSnackbarMessage('Feedback submitted successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      closeModal();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSnackbarMessage('Failed to submit feedback');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleInputChange = (e) => {
    setNewExerciseCore({ ...newExerciseCore, [e.target.name]: e.target.value });
  };

  const exercises = [
    { name: 'Plank', gif: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/11/body-saw-plank.gif', description: 'Static core stability exercise.' },
    { name: 'Russian Twist', gif: 'https://www.inspireusafoundation.org/wp-content/uploads/2023/09/russian-twist.gif', description: 'Twisting exercise to target obliques.' },
    { name: 'Leg Raises', gif: 'https://burnfit.io/wp-content/uploads/2023/11/LEG_RAISE.gif', description: 'Great for strengthening lower abs.' },
    { name: 'Bicycle Crunches', gif: 'https://newlife.com.cy/wp-content/uploads/2019/02/00031301-air-bike-m_waist_FIX_360.gif', description: 'Dynamic movement for core rotation.' },
  ];

  return (
    <Box sx={{ fontFamily: 'Arial, sans-serif', padding: 2, color: '#fff', backgroundColor: '#021a3a'}}>
      <Button
        variant="contained"
        onClick={() => navigate('/home2')}
        sx={{
          backgroundColor: '#2980b9',
          color: 'white',
          mb: 2,
          width: 120,
          '&:hover': { backgroundColor: '#00E2FD' },
        }}
      >
        Back
      </Button>

      <Typography variant="h4" align="center" fontWeight="600" gutterBottom>
        Core Exercises
      </Typography>
      <Typography variant="subtitle1" align="center" mb={3} color="white">
        Strengthen your core with these exercises!
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {exercises.map((exercise, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: '15px',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.05)' },
                height: 450,
                width: 350,
              }}
            >
              <CardMedia
                component="img"
                alt={`${exercise.name} gif`}
                height="250"
                image={exercise.gif}
                sx={{
                  objectFit: 'cover',
                  borderRadius: '8px',
                  mb: 2,
                }}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: 'white',
                  color: '#021a3a',
                  padding: 2,
                }}
              >
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  {exercise.name}
                </Typography>
                <Typography variant="body2">
                  {exercise.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={3}>
        <Button
          variant="contained"
          onClick={() => openModal('Please provide feedback before finishing:')}
          sx={{
            backgroundColor: '#2980b9',
            color: 'white',
            width: 120,
            '&:hover': { backgroundColor: '#6aa84f' },
          }}
        >
          Finish
        </Button>
      </Box>

      {/* Modal for Feedback */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 350,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            color: 'black',
          }}
        >
          <Typography variant="h6" mb={2}>
            {modalContent}
          </Typography>

          {/* Display the Category (Core) */}
          <Typography variant="h6" mb={2} color="primary">
            Category: <strong>Core</strong>
          </Typography>

          {error && (
            <Typography color="error" variant="body2" mb={2}>
              {error}
            </Typography>
          )}

          <TextField
            label="Most enjoyed exercise?"
            fullWidth
            variant="outlined"
            select
            value={newExerciseCore.name}
            onChange={(e) =>
              setNewExerciseCore({ ...newExerciseCore, name: e.target.value })
            }
            sx={{ mb: 2 }}
          >
            <MenuItem value="Plank">Plank</MenuItem>
            <MenuItem value="Russian Twist">Russian Twist</MenuItem>
            <MenuItem value="Leg Raises">Leg Raises</MenuItem>
            <MenuItem value="Bicycle Crunches">Bicycle Crunches</MenuItem>
          </TextField>

          <TextField
            label="Share your experience!"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newExerciseCore.description}
            onChange={handleInputChange}
            name="description"
            sx={{ mb: 2 }}
          />

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: '#2980b9',
                color: 'white',
                '&:hover': { backgroundColor: '#6aa84f' },
                mr: 3,
              }}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              onClick={closeModal}
              sx={{
                backgroundColor: '#e74c3c',
                color: 'white',
                '&:hover': { backgroundColor: '#c0392b' },
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Core;
