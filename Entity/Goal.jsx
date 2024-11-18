import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Goal = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [newGoal, setNewGoal] = useState({
    type: '',
    target: '',
    progress: false,
    deadline: '',
    userID: 1 // Assuming 1 as the logged-in user ID for now
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleProfileHover = () => {
    setIsModalVisible(true);
  };
  const handleProfileLeave = () => {
    setIsModalVisible(false);
  };

  const addGoal = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/goals', newGoal);
      setGoals([...goals, response.data]);
      setNewGoal({ type: '', target: '', progress: false, deadline: '', userID: 1 });
    } catch (error) {
      console.error('Error creating goal:', error);
      setError('Failed to create goal');
    }
  };

  const fetchGoals = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/goals');
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
      setError('Failed to fetch goals.');
    }
  };

  React.useEffect(() => {
    fetchGoals();
  }, []);

  const startEdit = (index) => {
    setEditIndex(index);
    setNewGoal(goals[index]);
  };

  const saveEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/goals/${goals[editIndex].goalID}`, newGoal);
      const updatedGoals = [...goals];
      updatedGoals[editIndex] = response.data;
      setGoals(updatedGoals);
      setEditIndex(null);
      setNewGoal({ type: '', target: '', progress: false, deadline: '', userID: 1 });
    } catch (error) {
      console.error('Error updating goal:', error);
      setError('Failed to update goal');
    }
  };

  const deleteGoal = async (index) => {
    const goalToDelete = goals[index];
    try {
      await axios.delete(`http://localhost:8080/api/goals/${goalToDelete.goalID}`);
      setGoals(goals.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting goal:', error);
      setError('Failed to delete goal.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewGoal({ ...newGoal, [name]: type === 'checkbox' ? checked : value });
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
              onMouseEnter={handleProfileHover}
              onMouseLeave={handleProfileLeave}
            >
              <img
                src="https://scontent.fmnl13-4.fna.fbcdn.net/v/t39.30808-1/462101278_508801152002813_5193789042383961383_n.jpg"
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
            <Link to="/wp"><p>Workout Plan</p></Link>
            <Link to="/home2"><p>Exercise</p></Link>
          </div>
        </div>

        {/* Goals Content */}
        <div style={styles.container}>
          <button onClick={() => navigate('/home2')}>
            &larr; Back to Home
          </button>
         
          <h2>My Goals</h2>

          {/* Add or Edit Goal Form */}
          <div style={styles.formContainer}>
          <input
  type="text"
  name="type"
  placeholder="Goal Type"
  value={newGoal.type}
  onChange={handleChange}
/>
<input
  type="text"
  name="target"
  placeholder="Goal Target (e.g., 70 kg)"
  value={newGoal.target}
  onChange={handleChange}
/>
<input
  type="date"
  name="deadline"
  placeholder="Deadline"
  value={newGoal.deadline}
  onChange={handleChange}
/>
<label>
  Goal Progress
  <input
    type="checkbox"
    name="progress"
    checked={newGoal.progress}
    onChange={handleChange}
  />
</label>
            {editIndex !== null ? (
              <button onClick={saveEdit} style={styles.saveButton}>Save</button>
            ) : (
              <button onClick={addGoal} style={styles.addButton}>Add Goal</button>
            )}
          </div>

          {/* List of Goals */}
          <ul style={styles.goalList}>
            {goals.map((goal, index) => (
              <li key={index} style={styles.goalItem}>
                <div style={styles.goalText}>
                  <strong>Type:</strong> {goal.type} <br />
                  <strong>Goal Weight:</strong> {goal.target}<br />
                  <strong>Deadline:</strong> {goal.deadline}<br />
                  <strong>Progress:</strong> {goal.progress ? 'Completed' : 'In Progress'}
                </div>
                <div>
                  <button onClick={() => startEdit(index)} style={styles.editButton}>Edit</button>
                  <button onClick={() => deleteGoal(index)} style={styles.deleteButton}>Delete</button>
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
    width: '80%', // This makes the width responsive
    height: '500px', // Adjust height here
    margin: '20px auto',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
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

export default Goal;