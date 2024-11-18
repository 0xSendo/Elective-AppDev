import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Flexibility = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [newExerciseFlx, setNewExerciseFlx] = useState({
    category: 'Flexibility',
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
    setNewExerciseFlx({
      category: 'Flexibility',
      description: '',
      name: '',
      videoUrl: ''
    });
    setError('');
  };

   // Function to handle the form submission
   const handleSubmit = async () => {
    if (!newExerciseFlx.name || !newExerciseFlx.description ) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/exercises', {
        category: 'Flexibility',
        description: newExerciseFlx.description,
        name: newExerciseFlx.name,
        videoURL: newExerciseFlx.videoUrl,
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
    setNewExerciseFlx({ ...newExerciseFlx, [e.target.name]: e.target.value });
  };

  const exercises = [
    { name: 'Yoga', gif: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/59b7c198206659.5ed6f840b25bd.gif', description: 'A set of poses to enhance flexibility.' },
    { name: 'Stretching', gif: 'https://i.pinimg.com/originals/b5/af/30/b5af309e14ac9ae12d34e056520eff2a.gif', description: 'Stretching exercises to improve muscle elasticity.' },
    { name: 'Pilates', gif: 'https://media3.giphy.com/media/zMBf4OJl9s2dZSFGmK/source.gif', description: 'Pilates moves to enhance flexibility and strength.' },
    { name: 'Dance', gif: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/bd57ba113225101.602392663a5dc.gif', description: 'Dance moves to improve flexibility and coordination.' },
  ];

  return (
    <div className="cardio-container">
      <button className="back-button" onClick={() => navigate('/home2')}>
        &larr; Back to Home
      </button>
      <h2>Flexibility Exercises</h2>
      <p>Follow these flexibility exercises to improve mobility and reduce injury!</p>
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
{/* Finish Button */}
<div className="modal-container">
        <button 
          className="finish-button" 
          onClick={() => openModal('Please provide feedback before finishing:')}
        >
          Finish
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal-backdrop">
            <div className="modal">
              <p>{modalContent}</p>
              <br />
              <p style={{color:'black', marginLeft:'10px', display:'flex', alignItems:'center'}}>Category:
                <h1 style={{color: 'teal', marginLeft:'55px'}}>FLEXIBILITY</h1></p>
              <br />
              <p style={{color:'black', marginLeft:'10px', display:'flex', alignItems:'center'}}>Feedback:</p>
              <input
                type="text"
                className="modal-input1"
                value={newExerciseFlx.description}
                onChange={handleInputChange}
                placeholder="Enter your feedback.."
                name="description"
              />
              <br />
               <p style={{color:'black', marginLeft:'10px', marginTop:'10px', display:'flex', alignItems:'center'}}>Most Enjoyed Exercise:</p>
              <input
                type="text"
                className="modal-input2"
                value={newExerciseFlx.name}
                onChange={handleInputChange}
                placeholder="Enter the name of exercise.."
                name="name"
              />
              <br />
              <p style={{color:'black', marginLeft:'10px', marginTop:'10px', display:'flex', alignItems:'center'}}>Any Exercise Suggestions?</p>
              <input
                type="text"
                className="modal-input3"
                value={newExerciseFlx.videoUrl}
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

export default Flexibility;
