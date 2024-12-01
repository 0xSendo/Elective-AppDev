import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Component Imports
import Login from './assets/Components/Login';
import SignUp from './assets/Components/SignUp';
//import HomePage from './assets/Components/HomePage';
import ProfileInput from './assets/Components/ProfileInput';
import LandingPage from './assets/Components/LandingPage';
import HomePage2 from './assets/Components/HomePage2';
import HomePage3 from './assets/Components/HomePage3';
import HomeSidebar from './assets/Components/HomeSidebar';
import Settings from './assets/Components/Settings';
import Home from './assets/Components/Home';
import Login2 from './assets/Components/Login2';

// Exercise Component Imports
import Cardio from './assets/Exercise/Cardio';
import Strength from './assets/Exercise/Strength';
import Balance from './assets/Exercise/Balance';
import Flexibility from './assets/Exercise/Flexibility';
import Core from './assets/Exercise/Core';
import Endurance from './assets/Exercise/Endurance';

// Feature Component Imports
import Goal from './assets/Entity/Goal';
import Progress from './assets/Entity/Progress';
import WorkoutPlan from './assets/Entity/WorkoutPlan';

const App = () => (
  <Router>
    <Routes>
      {/* Main Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<ProfileInput />} />
      {/* <Route path="/home" element={<HomePage />} /> */}
      <Route path="/home2" element={<HomePage2 />} />
      <Route path="/home" element={<HomePage3 />} />
      <Route path="/hs" element={<HomeSidebar />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/hm" element={<Home />} />
      <Route path="/login2" element={<Login2 />} />
      
      {/* Exercise Pages */}
      <Route path="cardio" element={<Cardio />} />
      <Route path="strength" element={<Strength />} />
      <Route path="balance" element={<Balance />} />
      <Route path="flexibility" element={<Flexibility />} />
      <Route path="core" element={<Core />} />
      <Route path="endurance" element={<Endurance />} />

      {/* Feature Pages */}
      <Route path="/goal" element={<Goal />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/wp" element={<WorkoutPlan />} />
    </Routes>
  </Router>
);

export default App;
