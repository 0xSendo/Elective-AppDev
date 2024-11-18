import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Progress = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const progressPercentage = 50; // This could be dynamically set

  const handleProfileHover = () => {
    setIsModalVisible(true);
  };

  const handleProfileLeave = () => {
    setIsModalVisible(false);
  };

  // SVG Circle Properties
  const radius = 50; // radius of the circle
  const strokeWidth = 10; // width of the progress stroke
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progressPercentage / 100) * circumference;

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
          <div className="nav-links">
            <div
              className="profile"
              onMouseEnter={handleProfileHover}
              onMouseLeave={handleProfileLeave}
            >
              <img
                src="https://scontent.fmnl13-4.fna.fbcdn.net/v/t39.30808-1/462101278_508801152002813_5193789042383961383_n.jpg?stp=dst-jpg_s200x200&_nc_cat=102&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeEMMWbT_fCH4rWX5Q_gCcn4bfDM77yYbHZt8MzvvJhsdtps3NIkm5PrrzjJJ6X399eQTIuBFNEPw3ZIA_nJHQc-&_nc_ohc=ssrwUXqYWNAQ7kNvgFXK6uR&_nc_zt=24&_nc_ht=scontent.fmnl13-3.fna&_nc_gid=AkgPdBFT9xLgVbBueSbj20t&oh=00_AYDeD_7ud1R0mDtzNtPDvQdpIaew4ljY78Dq4hqhpNHOEA&oe=673A3E19"
                alt="profile"
                className="logo-image"
              />
              {isModalVisible && (
                <div className="profile-modal">
                  <Link to="/settings">
                    <button className="settings-option">Settings</button>
                  </Link>
                  <Link to="/">
                    <button className="settings-option">Sign Out</button>
                  </Link>
                </div>
              )}
            </div>
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
            <Link to="/recent"><p>Recent<br></br> Activity</p></Link>
          </div>
        </div>

        {/* Main Content: Progress Tracker */}
        <div className="main-content" style={styles.container}>
          <button onClick={() => navigate('/home2')} style={styles.backButton}>
            &larr; Back to Home
          </button>
          <h2 style={{ color: 'white' }}>Progress Tracker</h2>
          
          {/* Progress Circle Container */}
          <div style={styles.progressContainer}>
            {/* Circular Progress Bar */}
            <svg
              width="200"
              height="200"
              viewBox="0 0 120 120"
              style={styles.progressCircle}
            >
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#e0e0e0"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#4caf50"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={styles.progressCircleFill}
              />
              <text x="50%" y="50%" textAnchor="middle" stroke="#51c3a8" strokeWidth="1px" dy=".3em" style={styles.progressText}>
                {progressPercentage}%
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#1e203b',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '30px 0',  // Adds space around the circle
    padding: '20px',
    borderRadius: '15px',
    backgroundColor: '#78B3CE',  // Container background color
    boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
    width: '220px',  // Controls the size of the container
    height: '220px',
  },
  progressCircle: {
    // Removed the rotate transformation to avoid the issue
  },
  progressCircleFill: {
    transition: 'stroke-dashoffset 0.3s ease-in-out',
  },
  progressText: {
    fontSize: '24px',
    fill: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#007acc',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    position: 'sticky',
    top: '20px',
    left: '20px',
    zIndex: 100,
  },
};

export default Progress;
