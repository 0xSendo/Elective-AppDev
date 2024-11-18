import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8080/api/users/signUp`, signUpData);
      console.log("Sign-Up successful:", response.data);
      console.log("This is response data status:", response.data.status);
      if (response.status === 201) {
        navigate('/login'); // Redirect to login page instead of profile
        setError('');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Email already in use. Please try again.');
      } else {
        setError('Sign Up failed. Please try again.');
      }
      console.error('Sign-Up error:', error);
    }
  };

  return (
    <div className="form-container">
      <form className="form-content" onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={signUpData.name}
            onChange={handleSignUpChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={signUpData.email}
            onChange={handleSignUpChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={signUpData.password}
            onChange={handleSignUpChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        <p style={{ color: 'red', marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
          {error}
        </p>
        <p className="signup-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
