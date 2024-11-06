import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';  
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    try {
        const userData = {
            email: email, // assuming you're capturing this in state
            password: password, // assuming you're capturing this in state
        };

        // Make the POST request to the API
        const response = await axios.post('http://localhost:8080/api/users/login', userData);
        console.log("Login successful:", response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/profile');            // Redirect or handle successful login here
    } catch (error) {
        if (error.response) {
            alert("Login failed. Invalid credentials");
            console.error(error.response.data);
        } else if (error.request) {
            console.error("Login failed. No response received from the server:", error.request);
        } else {
            console.error("Login failed. Error:", error.message);
        }
    }
};

  return (
    <div className="form-container">
      <form className="form-content" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
