import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//connection to backend
import axios from 'axios';
import { Box, Button, Typography, Grid, Modal, TextField, Card, CardContent, CardMedia, MenuItem, Snackbar, Alert } from '@mui/material';

const Balance = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [newExerciseBal, setNewExerciseBal] = useState({
    category: 'Balance',
    name: '',
    description: '', 
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
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
    setNewExerciseBal({
      category: 'Balance',
      name: '',
      description: '',
    });
    setError('');
  };

  const handleSubmit = async () => {
    if (!newExerciseBal.name || !newExerciseBal.description) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/exercises', {
        category: 'Balance',
        description: newExerciseBal.description,
        name: newExerciseBal.name,
      });
      console.log('Feedback submitted successfully:', response.data);
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
    setNewExerciseBal({ ...newExerciseBal, [e.target.name]: e.target.value });
  };

  const exercises = [
    { name: 'Single Leg Stand', gif: 'https://www.inspireusafoundation.org/wp-content/uploads/2021/06/single-leg-standing-calf-raise.gif', description: 'Stand on one leg to improve balance and stability.' },
    { name: 'Leg Crossovers', gif: 'https://liftmanual.com/wp-content/uploads/2023/04/standing-leg-cross-abductor-stretch.gif', description: 'Stand and cross one leg over the other, holding the position for a few seconds before switching sides.' },
    { name: 'Walking Lunges', gif: 'https://www.inspireusafoundation.org/wp-content/uploads/2023/08/bodyweight-walking-lunge-movement.gif', description: 'Slow and controlled movements to improve stability.' },
    { name: 'Squat to Stand', gif: 'https://www.inspireusafoundation.org/wp-content/uploads/2021/06/bodyweight-squat.gif', description: 'Return to a standing position slowly, focus on your balance and core control.' },
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
        Balance Exercises
      </Typography>
      <Typography variant="subtitle1" align="center" mb={4} color="white">
        Follow these balance exercises to improve stability and coordination!
      </Typography>

      <Grid container spacing={2} justifyContent="center">
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
                height: 'auto',
                maxWidth: 350, // Adjust the card width
                margin: 'auto',
              }}
            >
              <CardMedia
                component="img"
                alt={`${exercise.name} gif`}
                height="250" // Reduced height
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

          {/* Display the Category (Balance) */}
          <Typography variant="h6" mb={2} color="primary">
            Category: <strong>Balance</strong>
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
            value={newExerciseBal.name}
            onChange={handleInputChange}
            name="name"
            sx={{ mb: 2 }}
          >
            {/* Dropdown options */}
            <MenuItem value="Single Leg Stand">Single Leg Stand</MenuItem>
            <MenuItem value="Leg Crossovers">Leg Crossovers</MenuItem>
            <MenuItem value="Walking Lunges">Walking Lunges</MenuItem>
            <MenuItem value="Squat to Stand">Squat to Stand</MenuItem>
          </TextField>

          <TextField
            label="Share your experience!"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newExerciseBal.description}
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

export default Balance;
