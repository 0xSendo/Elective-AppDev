import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './assets/Components/Login';
import SignUp from './assets/Components/SignUp';
import HomePage from './assets/Components/HomePage';
import ProfileInput from './assets/Components/ProfileInput';
import LandingPage from './assets/Components/LandingPage';
import HomePage2 from './assets/Components/HomePage2'; // Import HomePage2

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<ProfileInput />} />
      <Route path="/home" element={<HomePage />} /> {/* Change here for consistency */}
      <Route path="/home2" element={<HomePage2 />} /> {/* Added route for HomePage2 */}
    </Routes>
  </Router>
);

export default App;
