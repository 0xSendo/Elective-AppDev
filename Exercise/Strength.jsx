import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Strength.css';

const Strength = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [newExerciseStr, setNewExerciseStr] = useState({
    category: 'Strength',
    description: '',
    name: '',
    videoUrl: ''
  });

  const [userInput, setUserInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
    setUserInput('');
    // Reset the form fields and error message to refresh the modal
    setNewExerciseStr({
      category: 'Strength',
      description: '',
      name: '',
      videoUrl: ''
    });
    setError('');
  };

  // Function to handle the form submission
  const handleSubmit = async () => {
    if (!newExerciseStr.name || !newExerciseStr.description ) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/exercises', {
        category: 'Strength',
        description: newExerciseStr.description,
        name: newExerciseStr.name,
        videoURL: newExerciseStr.videoUrl,
      });
      console.log('Feedback submitted successfully:', response.data);
      closeModal();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Failed to submit feedback');
    }
  };

  // Handle input change for feedback and exercise fields
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    setNewExerciseStr({ ...newExerciseStr, [e.target.name]: e.target.value });
  };

  const exercises = [
    { name: 'Push-Ups', gif: 'https://i.pinimg.com/originals/7e/51/8f/7e518fbecfdebefe167b7d222a692efd.gif', description: 'Classic push-up to build upper body strength.' },
    { name: 'Jump-Squats', gif: 'https://i.pinimg.com/originals/11/1c/70/111c70fced6c03e58d305b13658a2751.gif', description: 'Squats to strengthen legs and core.' },
    { name: 'Deadlifts', gif: 'https://i.pinimg.com/originals/29/cd/2e/29cd2ecb6abb91923413b1e68b195347.gif', description: 'Deadlifts for overall body strength.' },
    { name: 'Bench Press', gif: 'https://i.pinimg.com/originals/44/96/dd/4496dd7bcca41328bdc88aca13f848c8.gif', description: 'Bench press to build chest and arm muscles.' },
  ];

  return (
    <div className="cardio-container">
      <button className="back-button" onClick={() => navigate('/home2')}>
        &larr; Back to Home
      </button>
      <h2>Strength Exercises</h2>
      <p>Follow these strength exercises to build power and muscle!</p>
      <div className="exercise-grid">
        {exercises.map((exercise, index) => (
          <div key={index} className="exercise-card">
            <h3>{exercise.name}</h3>
            <div className="gif-container">
              <img src={exercise.gif} alt={`${exercise.name} gif`} />
            </div>
            <p>{exercise.description}</p>
          </div>
        ))}
      </div>

      <div className="modal-container">
        <button 
          className="finish-button"
          onClick={() => openModal('Please provide feedback before finishing:')}
        >
          Finish
        </button>
        {/*Modal*/}
        {isModalOpen && (
          <div className="modal-backdrop">
            <div className="modal">
              <p>{modalContent}</p>
              <br />
              <p style={{color:'black', marginLeft:'10px', display:'flex', alignItems:'center'}}>Category:
                <h1 style={{color: 'teal', marginLeft:'55px'}}>Strength</h1></p>
                <br />
              <p style={{color:'black', marginLeft:'10px', display:'flex', alignItems:'center'}}>Feedback:</p>
              <input
                type="text"
                className="modal-input1"
                value={newExerciseStr.description}
                onChange={handleInputChange}
                placeholder="Enter your feedback.."
                name="description"
              />
              <br />
              <p style={{color:'black', marginLeft:'10px', marginTop:'10px', display:'flex', alignItems:'center'}}>Most Enjoyed Exercise:</p>
              <input
                type="text"
                className="modal-input2"
                value={newExerciseStr.name}
                onChange={handleInputChange}
                placeholder="Enter the name of exercise.."
                name="name"
              />
              <br />
              <p style={{color:'black', marginLeft:'10px', marginTop:'10px', display:'flex', alignItems:'center'}}>Any Exercise Suggestions?</p>
              <input
                type="text"
                className="modal-input3"
                value={newExerciseStr.videoUrl}
                onChange={handleInputChange}
                placeholder="Enter video URL"
                name="videoUrl"
              />
              <div className="modal-buttons">
                <br />
                <button className="submit-button" onClick={handleSubmit}>
                  Submit
                </button>
                <button className="close-button" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Strength;
