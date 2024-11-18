import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cardio.css';

const Cardio = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [newExercise, setNewExercise] = useState({
    category: 'User chose Cardio',
    description: '', // feedback
    name: '', // most favorite exercise
    videourl: ''
  });

  const [userInput, setUserInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const [userExercises, setUserExercises] = useState([]); //forList

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
    setUserInput('');
    // Reset the form fields and error message to refresh the modal
    setNewExercise({
      category: 'User chose Cardio',
      description: '',
      name: '',
      videourl: ''
    });
    setError('');
  };

  // Function to handle the form submission
  const handleSubmit = async () => {
    // Check if required fields are filled
    if (!newExercise.name || !newExercise.description ) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/exercises', {
        category: 'Cardio',
        description: newExercise.description,
        name: newExercise.name,
        videoURL: newExercise.videourl,
      });
      console.log('Feedback submitted successfully:', response.data);
      console.log(newExercise.videourl);
      closeModal();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Failed to submit feedback');
    }
  };

  const fetchExercises = async () => {
  try{
    const response = await axios.get('http://localhost:8080/api/exercises');
    setUserExercises(response.data);
  }
    catch(error){
      console.error('Error fetching exercises.', error);
      setError('Failed to fetch exercises');
}
  };
  React.useEffect(() => {
    fetchExercises();
  }, []);

  const startEditExercise = (index) => {
    setEditIndex(index);
    setNewExercise(userExercises[index]);
  };
  const saveEditExercise = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/exercises/${userExercises[editIndex].exerciseID}`, newExercise);
      const updatedExercise = [...userExercises];
      updatedExercise[editIndex] = response.data;
      setUserExercises(updatedExercise);
      setEditIndex(null);
      setNewExercise({ category: '', description: '', name:'', videourl:'' });
    } catch (error) {
      console.error('Error updating exercise:', error);
      setError('Failed to update exercise');
    }
  };

  const deleteExercise = async (index) => {
    const exerciseToDelete = userExercises[index];
    try {
      await axios.delete(`http://localhost:8080/api/exercises/${exerciseToDelete.exerciseID}`);
      setUserExercises(userExercises.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting exercises:', error);
      setError('Failed to delete exercise.');
    }
  };
  // Handle input change for feedback and exercise fields
  const handleInputChange = (e) => {  
    setUserInput(e.target.value);
    setNewExercise({ ...newExercise, [e.target.name]: e.target.value });
  };

  const exercises = [
    { name: 'Jogging', gif: 'https://cdn.pixabay.com/animation/2023/07/01/15/20/15-20-44-805_512.gif', description: 'A steady jog to improve cardiovascular health.' },
    { name: 'Walking', gif: 'https://i.pinimg.com/originals/9e/3d/33/9e3d33d5b3f3829d01e12f77bce789e1.gif', description: 'A brisk walk for active recovery and heart health.' },
    { name: 'Cycling', gif: 'https://i.pinimg.com/originals/24/ae/8d/24ae8def288851503cf68340df174963.gif', description: 'Cycling to enhance endurance and leg strength.' },
    { name: 'Swimming', gif: 'https://i.pinimg.com/originals/1f/37/7a/1f377a713044a0a3ff47410b5fe07561.gif', description: 'Full-body exercise that increases stamina and strength.' },
  ];

  return (
    <div className="cardio-container">
      <button className="back-button" onClick={() => navigate('/home2')}>
        &larr; Back to Home
      </button>
      <h2>Cardio Exercises</h2>
      <p style={{ color: 'white' }}>Follow these cardio exercises to improve your endurance and stamina!</p>
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
                <h1 style={{color: 'teal', marginLeft:'55px'}}>CARDIO</h1></p>
              <br />
              <p style={{color:'black', marginLeft:'10px', display:'flex', alignItems:'center'}}>Feedback:</p>
              <input
                type="text"
                className="modal-input1"
                value={newExercise.description}
                onChange={handleInputChange}
                placeholder="Enter your feedback.."
                name="description"
                required
              />
              <br />
               <p style={{color:'black', marginLeft:'10px', marginTop:'10px', display:'flex', alignItems:'center'}}>Most Enjoyed Exercise:</p>
              <input
                type="text"
                className="modal-input2"
                value={newExercise.name}
                onChange={handleInputChange}
                placeholder="Enter the name of exercise.."
                name="name"
                required
              />
              {error && <span style={{ color: 'red' }}>{error}</span>}
              <br />
              <p style={{color:'black', marginLeft:'10px', marginTop:'10px', display:'flex', alignItems:'center'}}>Any Exercise Suggestions?</p>
              <input
                type="text"
                className="modal-input3"
                value={newExercise.videourl}
                onChange={handleInputChange}
                placeholder="Enter video URL"
                name="videourl"
                required
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
        {/* <ul style={styles.goalList}>
         */}

         {/* <ul>
            {userExercises.map((exercise, index) => (
              <li key={index} style={styles.goalItem}>
                
                 <div>
                  <strong>Type:</strong> {exercise.category} <br />
                  <strong>Goal Weight:</strong> {exercise.description}<br />
                  <strong>Deadline:</strong> {exercise.name}<br />
                
                </div>
                <div>
                  
                  <button onClick={() => startEditExercise(index)} >Edit</button>
                  <button onClick={() => deleteExercise(index)} >Delete</button>
                </div>
              </li>
            ))}
          </ul>  */}
          
      </div>
    </div>
  );
};

export default Cardio;
