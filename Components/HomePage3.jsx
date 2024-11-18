import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage3 = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/hs'); // Navigate to HomeSidebar
  };

  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <h1>Welcome to Your Fitness Journey!</h1>
        <p style={{ color: '#333' }}>
          Achieve your goals with personalized workouts, expert nutrition advice, and a supportive community.
        </p>
      </div>
      <button onClick={handleGetStarted} style={styles.getStartedButton}>Get Started</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: '2rem',
    color: '#62825D',
  },
  textContainer: {
    marginBottom: '2rem', // Add space below the text container
    maxWidth: '600px', // Set a max width for the container
    backgroundColor: "white",
    borderRadius: '12px',
    padding: '20px',
  },
  getStartedButton: {
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: 'Green',
    color: '#FFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '170px',
  },
};

export default HomePage3;
