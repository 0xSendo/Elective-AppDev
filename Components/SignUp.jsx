import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Add error state
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    setIsLoading(true); // Set loading state to true
    setError(null); // Reset any previous error

    try {
      const userData = {
        name: name,
        email: email,
        password: password,
      };

      // Make the POST request to the API
      const response = await axios.post('http://localhost:8080/api/users', userData);
      console.log("User created:", response.data);
      navigate('/login'); // Navigate to login on successful signup
    } catch (error) {
      // Improved error handling
      if (error.response) {
        setError("Sign up failed. " + (error.response.data.message || "Please try again.")); // Set error message from response
        console.error("Sign up failed. Please try again.", error.response.data);
      } else if (error.request) {
        setError("Sign up failed. No response received from the server."); // Set error for no response
        console.error("Sign up failed. No response received from the server:", error.request);
      } else {
        setError("Sign up failed. Error: " + error.message); // Set error for other cases
        console.error("Sign up failed. Error:", error.message);
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="form-container">
      <form className="form-content" onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <div className="input-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Sign Up</button>
        <p className="signup-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
