import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Typography, Grid, Modal, TextField, Card, CardContent, CardMedia, MenuItem, Snackbar, Alert } from '@mui/material';

const Endurance = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [newExerciseEnd, setNewExerciseEnd] = useState({
    category: 'Endurance',
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
    setNewExerciseEnd({
      category: 'Endurance',
      name: '',
      description: '',
    });
    setError('');
  };

  const handleSubmit = async () => {
    if (!newExerciseEnd.name || !newExerciseEnd.description) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/exercises', {
        category: 'Endurance',
        name: newExerciseEnd.name,
        description: newExerciseEnd.description,
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
    setNewExerciseEnd({ ...newExerciseEnd, [e.target.name]: e.target.value });
  };

  const exercises = [
    { name: 'Jumping Jacks', gif: 'https://burnfit.io/wp-content/uploads/2023/11/JUMPING_JACK.gif', description: 'Increase heart rate and improve cardiovascular endurance.' },
    { name: 'Mountain Climbers', gif: 'https://newlife.com.cy/wp-content/uploads/2020/03/06291301-Mountain-Climber-Lunge_Cardio_360.gif', description: 'Targets core muscles and improves stamina.' },
    { name: 'Burpees', gif: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/01/burpee-movement.gif', description: 'Enhances strength and endurance while burning fat.' },
    { name: 'High Knees', gif: 'https://burnfit.io/wp-content/uploads/2023/11/HIGH_KNEE_SKIP.gif', description: 'Improving cardiovascular health and leg endurance.' },
  ];

  return (
    <Box sx={{ fontFamily: 'Arial, sans-serif', padding: 4, color: '#fff', backgroundColor: '#021a3a' }}>
      {/* Back Button */}
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

      <Typography variant="h3" align="center" fontWeight="600" gutterBottom>
        Endurance Exercises
      </Typography>
      <Typography variant="subtitle1" align="center" mb={4} color="white">
        Follow these endurance exercises to boost stamina and cardiovascular fitness!
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {exercises.map((exercise, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
                height: '100%',
                width: '100%',
              }}
            >
              <CardMedia
                component="img"
                alt={`${exercise.name} gif`}
                height="200" // Reduced height to make cards smaller
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
                <Typography variant="body2">{exercise.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Finish Button */}
      <Box textAlign="center" mt={4}>
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
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            color: 'black',
          }}
        >
          <Typography variant="h6" mb={2}>
            {modalContent}
          </Typography>

          {/* Display the Category (Endurance) */}
          <Typography variant="h6" mb={2} color="primary">
            Category: <strong>Endurance</strong>
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
            value={newExerciseEnd.name}
            onChange={handleInputChange}
            name="name"
            sx={{ mb: 2 }}
          >
            {/* Dropdown options */}
            <MenuItem value="Jumping Jacks">Jumping Jacks</MenuItem>
            <MenuItem value="Mountain Climbers">Mountain Climbers</MenuItem>
            <MenuItem value="Burpees">Burpees</MenuItem>
            <MenuItem value="High Knees">High Knees</MenuItem>
          </TextField>

          <TextField
            label="Share your experience!"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newExerciseEnd.description}
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
                mr: 4,
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

export default Endurance;
