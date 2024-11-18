import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const WorkoutPlan = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [newPlan, setNewPlan] = useState({
    duration: '',
    weeklygoal: '',
    userID: 1,
  });
  const [plan, setPlan] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle Sidebar Modal visibility
  const toggleProfileModal = () => setIsModalVisible(!isModalVisible);

  // Fetch plans on mount
  // useEffect(() => {
  //   const fetchPlans = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8080/api/workoutplans');
  //       setPlan(response.data);
  //     } catch (error) {
  //       console.error('Error fetching plans:', error);
  //       setError('Failed to fetch.');
  //     }
  //   };
  //   fetchPlans();
  // }, []);

  // Handle form input changes
 

  // Add new plan
  const addPlan = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/workoutplans', newPlan);
      setPlan((prev) => [...prev, response.data]);
      setNewPlan({ duration: '', weeklygoal: '', userID: 1 });
    } catch (error) {
      console.error('Error creating plan:', error);
      setError('Failed to create plan');
    }
  };

  const fetchPlans = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/workoutplans');
          setPlan(response.data);
        } catch (error) {
          console.error('Error fetching plans:', error);
          setError('Failed to fetch.');
        }
      };

      React.useEffect(() => {
        fetchPlans(); // Fetch goals when the component mounts
      }, []);


  // Start editing a plan
  const startEdit = (index) => {
    setEditIndex(index);
    setNewPlan(plan[index]);
  };

  // Save edited plan
  const saveEdit = async () => {
    try {
      const updatedPlan = await axios.put(
        `http://localhost:8080/api/workoutplans/${plan[editIndex].planID}`,
        newPlan
      );
      const updatedPlans = [...plan];
      updatedPlans[editIndex] = updatedPlan.data;
      setPlan(updatedPlans);
      setEditIndex(null);
      setNewPlan({ duration: '', weeklygoal: '', userID: 1 });
    } catch (error) {
      console.error('Error updating plan:', error);
      setError('Failed to update plan');
    }
  };

  // Delete plan
  const deletePlan = async (index) => {
    try {
      const planID = plan[index].planID;
      await axios.delete(`http://localhost:8080/api/workoutplans/${planID}`);
      setPlan(plan.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting plan:', error);
      setError('Failed to delete plan');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="homepage">
      {/* Top Navigation Bar */}
      <header className="top-bar">
        <nav className="navbar">
          <div className="logo">
            <Link to="/">
              <img
                src="https://scontent.xx.fbcdn.net/v/t1.15752-9/462636547_890081249996736_3820895762277585098_n.png"
                alt="Logo"
                className="logo-image"
              />
            </Link>
          </div>
          <div className="nav-links">
            <div
              className="profile"
              onMouseEnter={toggleProfileModal}
              onMouseLeave={toggleProfileModal}
            >
              <img
                src="https://scontent.fmnl13-4.fna.fbcdn.net/v/t39.30808-1/462101278_508801152002813_5193789042383961383_n.jpg"
                alt="Profile"
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

      {/* Main Content */}
      <div className="content-wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="features-list">
            <Link to="/hs"><p>Home</p></Link>
            <Link to="/goal"><p>Goals</p></Link>
            <Link to="/progress"><p>Progress</p></Link>
            <Link to="/wp"><p>Workout Plan</p></Link>
            <Link to="/home2"><p>Exercise</p></Link>
          </div>
        </div>

        {/* Goals Content */}
        <div style={styles.container}>
          <button onClick={() => navigate('/home2')}>&larr; Back to Home</button>
          <h2>My Workout Plans</h2>

          {/* Add or Edit Plan Form */}
          <div style={styles.formContainer}>
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={newPlan.duration}
              onChange={handleChange}
            />
            <input
              type="text"
              name="weeklygoal"
              placeholder="Goal Target (e.g., 70 kg)"
              value={newPlan.weeklygoal}
              onChange={handleChange}
            />
            {editIndex !== null ? (
              <button onClick={saveEdit} style={styles.saveButton}>Save</button>
            ) : (
              <button onClick={addPlan} style={styles.addButton}>Add Plan</button>
            )}
          </div>

          {/* List of Goals */}
          <ul style={styles.goalList}>
            {plan.map((plan, index) => (
              <li key={plan.planID} style={styles.goalItem}>
                <div style={styles.goalText}>
                  <strong>Duration:</strong> {plan.duration} <br />
                  <strong>Weekly Goal:</strong> {plan.weeklygoal}<br />
                </div>
                <div>
                  <button onClick={() => startEdit(index)} style={styles.editButton}>Edit</button>
                  <button onClick={() => deletePlan(index)} style={styles.deleteButton}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f8f8f8',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    width: '80%',
    margin: '20px auto',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  addButton: {
    padding: '8px 12px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '8px 12px',
    backgroundColor: '#ffa500',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  goalList: {
    listStyleType: 'none',
    padding: 0,
  },
  goalItem: {
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    marginBottom: '10px',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
  },
  goalText: {
    textAlign: 'left',
  },
  editButton: {
    padding: '5px 8px',
    backgroundColor: '#ffa500',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '5px 8px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default WorkoutPlan;
