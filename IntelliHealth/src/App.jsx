import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './assets/Components/Login';
import SignUp from './assets/Components/SignUp';
import HomePage from './assets/Components/HomePage';
import ProfileInput from './assets/Components/ProfileInput';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<ProfileInput />} />
      <Route path="/home" element={<HomePage />} /> {/* Updated to /home for consistency */}
    </Routes>
  </Router>
);

export default App;
