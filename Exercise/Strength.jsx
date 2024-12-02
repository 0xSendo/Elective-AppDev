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

const Strength = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [newExerciseStr, setNewExerciseStr] = useState({
    category: 'Strength',
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
    setNewExerciseStr({
      category: 'Strength',
      name: '',
      description: '',   
    });
    setError('');
  };

  const handleSubmit = async () => {
    if (!newExerciseStr.name || !newExerciseStr.description) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/exercises', {
        category: 'Strength',
        name: newExerciseStr.name,
        description: newExerciseStr.description,
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
    setNewExerciseStr({ ...newExerciseStr, [e.target.name]: e.target.value });
  };

  const exercises = [
    { name: 'Push-Ups', gif: 'https://burnfit.io/wp-content/uploads/2023/11/PUSH_UP.gif', description: 'Classic push-up to build upper body strength.' },
    { name: 'Jump-Squats', gif: 'https://burnfit.io/wp-content/uploads/2023/11/JUMP_SQT.gif', description: 'Squats to strengthen legs and core.' },
    { name: 'Deadlifts', gif: 'https://burnfit.io/wp-content/uploads/2023/11/SM_BB_DL.gif', description: 'Deadlifts for overall body strength.' },
    { name: 'Bench Press', gif: 'https://burnfit.io/wp-content/uploads/2023/11/BB_BP.gif', description: 'Bench press to build chest and arm muscles.' },
  ];

  return (
    <Box sx={{ fontFamily: 'Arial, sans-serif', padding: 4, color: '#fff', backgroundColor: '#021a3a', }}>
      <Button
        variant="contained"
        onClick={() => navigate('/home2')}
        sx={{
          backgroundColor: '#2980b9',
          color: 'white',
          mb: 1.5,
          width: 120,
          '&:hover': { backgroundColor: '#00E2FD' },
        }}
      >
        Back
      </Button>

      <Typography variant="h3" align="center" fontWeight="600" gutterBottom>
        Strength Exercises
      </Typography>
      <Typography variant="subtitle1" align="center" mb={3} color="white">
        Follow these strength exercises to build power and muscle!
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
                
                height: 450,   // Adjusted height
                width: 360,    // Adjusted width
              }}
            >
              <CardMedia
                component="img"
                alt={`${exercise.name} gif`}
                height="250"   // Adjusted gif height
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
            width: 380,
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

          {/* Display the Category (Strength) */}
          <Typography variant="h6" mb={2} color="primary">
            Category: <strong>Strength</strong>
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
            value={newExerciseStr.name}
            onChange={(e) =>
              setNewExerciseStr({ ...newExerciseStr, name: e.target.value })
            }
            sx={{ mb: 2 }}
          >
            {/* Dropdown options */}
            <MenuItem value="Push-Ups">Push-Ups</MenuItem>
            <MenuItem value="Jump-Squats">Jump Squats</MenuItem>
            <MenuItem value="Deadlifts">Deadlifts</MenuItem>
            <MenuItem value="Bench Press">Bench Press</MenuItem>
          </TextField>

          <TextField
            label="Share your experience!"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newExerciseStr.description}
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

export default Strength;
