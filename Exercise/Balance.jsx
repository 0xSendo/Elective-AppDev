import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Balance = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [newExerciseBal, setNewExerciseBal] = useState({
    category: 'User chose Balance',
    description: '', // feedback
    name: '', // most favorite exercise
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
    setNewExerciseBal({
      category: 'Strength',
      description: '',
      name: '',
      videoUrl: ''
    });
    setError('');
  };
  
  // Function to handle the form submission
  const handleSubmit = async () => {
    if (!newExerciseBal.name || !newExerciseBal.description ) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/exercises', {
        category: 'Balance',
        description: newExerciseBal.description,
        name: newExerciseBal.name,
        videoURL: newExerciseBal.videoUrl,
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
    setNewExerciseBal({ ...newExerciseBal, [e.target.name]: e.target.value });
  };

  const exercises = [
    { name: 'Single Leg Stand', gif: 'https://www.adlsmartcare.co.uk/adlsmartcare/Upload/products/Balancing_on_one_leg_M.gif', description: 'Stand on one leg to improve balance and stability.' },
    { name: 'Heel-to-Toe Walk', gif: 'https://i.pinimg.com/originals/84/66/bd/8466bde73ad1f154cc6fda954f7ba589.gif', description: 'Walk in a straight line by placing one foot directly in front of the other.' },
    { name: 'Tai Chi', gif: 'https://media.tenor.com/ymiXkdxktuQAAAAM/kung-fu-panda.gif', description: 'Slow and controlled movements to improve balance and focus.' },
    { name: 'Balance Board', gif: 'https://content.presentermedia.com/content/animsp/00010000/10011/stick_figure_balance_board_md_nwm_v2.gif', description: 'Use a balance board to engage your core and leg muscles.' },
  ];

  return (
    <div className="balance-container">
      <button className="back-button" onClick={() => navigate('/home2')}>
        &larr; Back to Home
      </button>
      <h2>Balance Exercises</h2>
      <p>Follow these balance exercises to improve stability and coordination!</p>
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
                <h1 style={{color: 'teal', marginLeft:'55px'}}>BALANCE</h1></p>
              <br />
              <p style={{color:'black', marginLeft:'10px', display:'flex', alignItems:'center'}}>Feedback:</p>
              <input
                type="text"
                className="modal-input1"
                value={newExerciseBal.description}
                onChange={handleInputChange}
                placeholder="Enter your feedback.."
                name="description"
              />
              <br />
               <p style={{color:'black', marginLeft:'10px', marginTop:'10px', display:'flex', alignItems:'center'}}>Most Enjoyed Exercise:</p>
              <input
                type="text"
                className="modal-input2"
                value={newExerciseBal.name}
                onChange={handleInputChange}
                placeholder="Enter the name of exercise.."
                name="name"
              />
              <br />
              <p style={{color:'black', marginLeft:'10px', marginTop:'10px', display:'flex', alignItems:'center'}}>Any Exercise Suggestions?</p>
              <input
                type="text"
                className="modal-input3"
                value={newExerciseBal.videoUrl}
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

export default Balance;
