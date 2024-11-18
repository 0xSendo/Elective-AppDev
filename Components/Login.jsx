import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';  

const Login = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  const [signInData, setSignInData] = useState({ email: '', password: '' });

  const handleSignInChange = async (e) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
  };


  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const requestBody = {
      email: signInData.email.trim().toLowerCase(),
      password: signInData.password,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', requestBody );
      console.log('Sign-In successful:', response.data);
      if(response.status === 200){
        navigate('/profile'); 
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        setError(error.response.status === 401 
          ? 'Sign In failed: Unauthorized. Please check your credentials.' 
          : 'Sign In Failed: ${error.response.data.message}');
      } else {
        console.error('Error:', error.message);
        setError('Sign In failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form className="form-content" onSubmit={handleSignInSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            name='email'
            value={signInData.email}
            onChange={handleSignInChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            name='password'
            value={signInData.password}
            onChange={handleSignInChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p style={{color:'red', marginTop:'10px', display:'flex', justifyContent:'center', alignItems:'center'}}>
          {error}
        </p>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
