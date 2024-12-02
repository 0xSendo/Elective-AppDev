import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//connection to backend
import axios from 'axios';

//muis
import { Box, Button, Typography, Card, CardContent, CardMedia, Grid, Modal, TextField, MenuItem, Snackbar, Alert } from '@mui/material';

const Flexibility = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [newExerciseFlx, setNewExerciseFlx] = useState({
    category: 'Flexibility',
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
    setNewExerciseFlx({
      category: 'Flexibility',
      name: '',
      description: '',
    });
    setError('');
  };

  const handleSubmit = async () => {
    if (!newExerciseFlx.name || !newExerciseFlx.description) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/exercises', {
        category: 'Flexibility',
        name: newExerciseFlx.name,
        description: newExerciseFlx.description,     
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
    setNewExerciseFlx({ ...newExerciseFlx, [e.target.name]: e.target.value });
  };

  const exercises = [
    { name: 'Yoga', gif: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/59b7c198206659.5ed6f840b25bd.gif', description: 'A set of poses to enhance flexibility.' },
    { name: 'Stretching', gif: 'https://i.pinimg.com/originals/b5/af/30/b5af309e14ac9ae12d34e056520eff2a.gif', description: 'Stretching exercises to improve muscle elasticity.' },
    { name: 'Pilates', gif: 'https://media3.giphy.com/media/zMBf4OJl9s2dZSFGmK/source.gif', description: 'Pilates moves to enhance flexibility and strength.' },
    { name: 'Dance', gif: 'https://i.pinimg.com/originals/07/54/aa/0754aa758a2a81df63b2e98c4c6e012c.gif', description: 'Dance moves to improve flexibility and coordination.' },
  ];

  return (
    <Box sx={{ fontFamily: 'Arial, sans-serif', padding: 3, color: '#fff', backgroundColor: '#021a3a' }}> {/* Reduced padding */}
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
        Flexibility Exercises
      </Typography>
      <Typography variant="subtitle1" align="center" mb={3} color="white"> {/* Reduced margin-bottom */}
        Follow these flexibility exercises to improve mobility and reduce injury!
      </Typography>

      <Grid container spacing={3} justifyContent="center"> {/* Reduced spacing */}
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
                height: 450,  // Reduced height
                width: 360,  // Reduced width
              }}
            >
              <CardMedia
                component="img"
                alt={`${exercise.name} gif`}
                height="250"  // Reduced gif height
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
            width: 380,  // Reduced modal width
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

          {/* Display the Category (Flexibility) */}
          <Typography variant="h6" mb={2} color="primary">
            Category: <strong>Flexibility</strong>
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
            value={newExerciseFlx.name}
            onChange={(e) =>
              setNewExerciseFlx({ ...newExerciseFlx, name: e.target.value })
            }
            sx={{ mb: 2 }}
          >
            {/* Dropdown options */}
            <MenuItem value="Yoga">Yoga</MenuItem>
            <MenuItem value="Stretching">Stretching</MenuItem>
            <MenuItem value="Pilates">Pilates</MenuItem>
            <MenuItem value="Dance">Dance</MenuItem>
          </TextField>

          <TextField
            label="Share your experience!"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newExerciseFlx.description}
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

export default Flexibility;
