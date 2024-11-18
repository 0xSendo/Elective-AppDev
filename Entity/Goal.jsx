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
            {/* Wrap the logo in a Link to navigate to the LandingPage */}
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
            <Link to="/recent"><p>Recent <br></br>Activity</p></Link>
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
        <strong style={{ color: '#333333' }}>Type:</strong> {goal.type} <br />
        <strong style={{ color: '#333333' }}>Goal Weight:</strong> {goal.target}<br />
        <strong style={{ color: '#333333' }}>Deadline:</strong> {goal.deadline}<br />
        <strong style={{ color: '#333333' }}>Progress:</strong> {goal.progress ? 'Completed' : 'In Progress'}
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
    color: '#002642'
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
