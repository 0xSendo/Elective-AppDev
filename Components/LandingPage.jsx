// LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  // List of GIF URLs
  const gifList = [
    'https://d2w9rnfcy7mm78.cloudfront.net/20123634/original_603a3a7a1e06dead8c2838f090575ff1.gif?1675116798',
    'https://i.makeagif.com/media/10-12-2015/bcPmCt.gif',
    'https://i.makeagif.com/media/10-12-2015/z0QURe.gif',
    'https://i.makeagif.com/media/4-20-2022/hL1t1P.gif'
  ];

  // State to track the current GIF
  const [currentGif, setCurrentGif] = useState(gifList[0]);

  useEffect(() => {
    // Function to change GIF every 7 seconds
    const intervalId = setInterval(() => {
      setCurrentGif((prevGif) => {
        const currentIndex = gifList.indexOf(prevGif);
        const nextIndex = (currentIndex + 1) % gifList.length;
        return gifList[nextIndex];
      });
    }, 7000); // Change GIF every 7 seconds

    // Cleanup interval when component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs only once after initial render

  return (
    <div 
      className="landing-container" 
      style={{ 
        display: 'flex', // Apply flexbox
        justifyContent: 'space-between', 
        height: '100vh', 
        backgroundColor: '#1e203b', // Set background color for overall container
      }}
    >
      {/* Left Section: Text Section */}
      <div 
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '50px',
        }}
      >
        <header className="navbar">
          <h1>IntelliHealth</h1>
          <nav>
            <button onClick={() => navigate('/')}>Home</button>
            <button onClick={() => navigate('/about')}>About</button>
            <button onClick={() => navigate('/contact')}>Contact</button>
          </nav>

          {/* Log In and Sign Up Buttons (Aligned to the Right) */}
         
        </header>

        <main className="hero-section">
          <h2>
            Welcome to IntelliHealth, Your Personalized Health & Fitness Hub!
          </h2>
          <p>
            At IntelliHealth, we aim to provide customized workout plans to help
            you achieve your fitness goals. Whether you’re a beginner just
            starting your journey or a professional athlete, we have something
            tailored just for you!
          </p>
          <p>
            Our goal is to promote sustainable and healthy living by offering
            guidance and workout routines that fit your lifestyle. Join us today
            and embark on a transformative fitness experience!
          </p>
        </main>
      </div>

      {/* Right Section: GIF Section */}
      <div 
        style={{
          flex: 1,
          backgroundImage: `url(${currentGif})`, // Set background image dynamically
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          position: 'relative', // Positioning for absolute elements
        }}
      >
        {/* Log In and Sign Up Buttons on the Right Side */}
        <div className="navbar-right">
          <button onClick={() => navigate('/login')}>Log In</button>
          <button onClick={() => navigate('/signup')} className="register-btn">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
