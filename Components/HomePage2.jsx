import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './HomePage2.css';
import HomeSidebar from './HomeSidebar';

const HomePage2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const navigate = useNavigate();
  // Fetch stored activities from localStorage or initialize an empty array
  // const storedActivities = JSON.parse(localStorage.getItem('activities')) || [];
  // const [activities, setActivities] = useState(storedActivities);
  // const [newActivity, setNewActivity] = useState({ name: '', duration: '', intensity: '' });
  // const [editMode, setEditMode] = useState(false);

  // const openModal = (content) => {
  //   setModalContent(content);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setModalContent('');
  // };

  const handleCardioJoin = () => {
    navigate('/cardio');
  };

  const handleStrengthJoin = () => {
    navigate('/strength');
  };

  const handleCoreJoin = () => {
    navigate('/core');  // Navigate to the Core page when Join is clicked
  };

  const handleFlexJoin = () => {
    navigate('/flexibility');  // Navigate to the Core page when Join is clicked
  };

  const handleBalanceJoin = () => {
    navigate('/balance');  // Navigate to the Core page when Join is clicked
  };

  const toGoals = () => {
    navigate('/goals');
  };

  const toProgress = () => {
    navigate('/progress');
  };


  return (
    <div className="homepage">
      {/* Top Navigation Bar */}
      <header className="top-bar">
        <nav className="navbar">
        <div className="logo">
            {/* Logo linked to LandingPage */}
            <Link to="/">
              <img
                src="https://scontent.xx.fbcdn.net/v/t1.15752-9/462636547_890081249996736_3820895762277585098_n.png?stp=dst-png_s480x480&_nc_cat=110&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHgTV-uknlkt8YDdrlpB-DyR8gzgLQE6_RHyDOAtATr9F7ESPDV0fXBtCVHQKu0olaG01TjAWutVkVeV1_41Yh4&_nc_ohc=3O6CFrBVI3wQ7kNvgEDLxrs&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&oh=03_Q7cD1QH8KH11rsnCF5BbAxgNhmvQ-j4opweORqwdfmT-pPcg-w&oe=675BB6D6"
                alt="Logo"
                className="logo-image"
              />
            </Link>
          </div>
        </nav>
      </header>

      {/* Main content and sidebar wrapper */}
      <div className="content-wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="features-list">
            <Link to="/hs"><p>Home</p></Link>
            <Link to="/goal"><p>Goals</p></Link>
            <Link to="/progress"><p>Progress</p></Link>
            <Link to="/wp"><p>WorkoutPlan</p></Link>
            <Link to="/home2"><p>Exercise</p></Link>
            <Link to="/recent"><p>Recent Activity</p></Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
  <div className="exercise-header">
    <h2>Type of Exercise</h2>
  </div>
  <div className="workout-plan">
    <div className="workout-item">
      <div className="exercise-name">
        <h3>Cardio</h3>
      </div>
      <div className="workout-details">
        <p><strong>Difficulty Level:</strong></p><p style={{ color: 'green' }}><b>Easy</b></p>
        <p>Improves heart and lung health, burns calories, boosts stamina, and helps with weight management.</p>
      </div>
      <button className="join-button" onClick={handleCardioJoin}>Join</button>
    </div>
    <div className="workout-item">
      <div className="exercise-name">
        <h3>Strength</h3>
      </div>
      <div className="workout-details">
        <p><strong>Difficulty Level:</strong></p> <p style={{ color: '#F96E2A' }}> <b>Intermediate</b></p>
        <p>Increases muscle mass, strengthens bones, enhances metabolism, and improves overall functional strength.</p>
      </div>
      <button className="join-button" onClick={handleStrengthJoin}>Join</button>
    </div>
    <div className="workout-item">
      <div className="exercise-name">
        <h3>Flexibility</h3>
      </div>
      <div className="workout-details">
        <p><strong>Difficulty Level:</strong></p><p style={{ color: 'green' }}> <b>Easy</b></p>
        <p>Enhances muscle elasticity, reduces stiffness, prevents injury, and improves posture and mobility.</p>
      </div>
      <button className="join-button" onClick={handleFlexJoin}>Join</button>
    </div>
    <div className="workout-item">
      <div className="exercise-name">
        <h3>Core</h3>
      </div>
      <div className="workout-details">
        <p><strong>Difficulty Level:</strong></p><p style={{ color: 'red' }}> <b>Advanced</b></p>
        <p>Improves posture, supports balance, reduces risk of injury, and strengthens the torso for better functional movement.</p>
      </div>
      <button className="join-button" onClick={handleCoreJoin}>Join</button>
    </div>
    <div className="workout-item">
      <div className="exercise-name">
        <h3>Balance</h3>
      </div>
      <div className="workout-details">
        <p><strong>Difficulty Level:</strong></p> <p style={{ color: '#F96E2A' }}> <b>Intermediate</b></p>
        <p>Improves coordination, reduces risk of falls, strengthens stabilizing muscles, and supports better overall physical control.</p>
      </div>
      <button className="join-button" onClick={handleBalanceJoin}>Join</button>
    </div>
  </div>




        </div>
      </div>

      {/* Modals for Goal and Progress */}
      {/* {isModalOpen && modalContent === 'Goal' && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>Goal</h2>
      <p>Set your fitness goals here. Define your objectives to achieve them!</p>

      {/* Checkboxes for different goals */}
      {/* <div className="goal-checkboxes">
        <div className="goal-item">
          <input type="checkbox" id="goal1" />
          <label htmlFor="goal1">
            <strong>Build Muscle</strong>
            <p>Focus on increasing muscle mass through strength training exercises.</p>
          </label>
        </div>

        <div className="goal-item">
          <input type="checkbox" id="goal2" />
          <label htmlFor="goal2">
            <strong>Lose Fat</strong>
            <p>Work on reducing body fat percentage with a combination of cardio and weight loss diet.</p>
          </label>
        </div>

        <div className="goal-item">
          <input type="checkbox" id="goal3" />
          <label htmlFor="goal3">
            <strong>Increase Stamina</strong>
            <p>Improve cardiovascular endurance with regular cardio exercises.</p>
          </label>
        </div>

        <div className="goal-item">
          <input type="checkbox" id="goal4" />
          <label htmlFor="goal4">
            <strong>Improve Flexibility</strong>
            <p>Enhance flexibility through stretching, yoga, or pilates.</p>
          </label>
        </div>

        <div className="goal-item">
          <input type="checkbox" id="goal5" />
          <label htmlFor="goal5">
            <strong>Gain Strength</strong>
            <p>Increase muscle strength and power through resistance training.</p>
          </label>
        </div>
      </div>

      <button onClick={closeModal} className="close-modal-button">Close</button>
    </div>
  </div> *
)}

      {/* Modal for Progress */}
      {/* {isModalOpen && modalContent === 'Progress' && (
        <div className="modal-overlay">
          <div className="modal">
          <h1>Welcome {user.name}! This is your progress!</h1>
            <p>Track your progress and see how far you've come on your fitness journey!</p>

            <div className="progress-tracker">
              <p>First Weight: {profile.weight}kg </p>
              <label htmlFor="progressSlider">
                <strong>Your Progress:</strong>
              </label>
              <input
                type="range"
                id="progressSlider"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                className="progress-slider"
              />
              <p>{progress}%</p> {/* Display progress percentage */}
            {/* </div>

            <button onClick={closeModal} className="close-modal-button">Close</button>
          </div>
        </div>
      )} */} */

    
    </div>
  );
};

export default HomePage2;
