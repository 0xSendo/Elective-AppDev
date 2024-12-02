import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//mui
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
  Alert,
} from '@mui/material';

//connection to backend
import axios from 'axios';


const Cardio = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [newExercise, setNewExercise] = useState({
    category: 'Cardio',
    description: '',
    name: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [userExercises, setUserExercises] = useState([]);
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
    setNewExercise({
      category: 'Cardio',
      description: '',
      name: '',
    });
    setError('');
  };

  const handleSubmit = async () => {
    if (!newExercise.name || !newExercise.description) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/exercises', {
        category: 'Cardio',
        description: newExercise.description,
        name: newExercise.name,
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

  const fetchExercises = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/exercises');
      setUserExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises.', error);
      setError('Failed to fetch exercises');
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const exercises = [
    { name: 'Jogging', gif: 'https://cdn.pixabay.com/animation/2023/07/01/15/20/15-20-44-805_512.gif', description: 'A steady jog to improve cardiovascular health.' },
    { name: 'Walking', gif: 'https://i.pinimg.com/originals/9e/3d/33/9e3d33d5b3f3829d01e12f77bce789e1.gif', description: 'A brisk walk for active recovery and heart health.' },
    { name: 'Cycling', gif: 'https://i.pinimg.com/originals/24/ae/8d/24ae8def288851503cf68340df174963.gif', description: 'Cycling to enhance endurance and leg strength.' },
    { name: 'Swimming', gif: 'https://i.pinimg.com/originals/1f/37/7a/1f377a713044a0a3ff47410b5fe07561.gif', description: 'Full-body exercise that increases stamina and strength.' },
  ];

  return (
    <Box
      sx={{
        fontFamily: 'Arial, sans-serif',
        padding: 4,
        backgroundColor: '#021a3a',
        color: '#',
        width: '100%',
      }}
    >
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
        Cardio Exercises
      </Typography>
      <Typography variant="subtitle1" align="center" mb={4} color="white">
        Follow these cardio exercises to improve your endurance and stamina!
      </Typography>

      <Grid container spacing={4} justifyContent="center">
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
                <Typography
                  variant="h6"
                  fontWeight="600"
                  gutterBottom
                >
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

          <Typography variant="h6" mb={2} color="primary">
            Category: <strong>Cardio</strong>
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
            value={newExercise.name}
            onChange={(e) =>
              setNewExercise({ ...newExercise, name: e.target.value })
            }
            sx={{ mb: 2 }}
          >
            <MenuItem value="Jogging">Jogging</MenuItem>
            <MenuItem value="Walking">Walking</MenuItem>
            <MenuItem value="Cycling">Cycling</MenuItem>
            <MenuItem value="Swimming">Swimming</MenuItem>
          </TextField>

          <TextField
            label="Share your experience!"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newExercise.description}
            onChange={(e) =>
              setNewExercise({ ...newExercise, description: e.target.value })
            }
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

export default Cardio;
