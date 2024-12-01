import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Divider } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import HomeSidebar from '../Components/HomeSidebar';

const Home = () => {
  const [goals, setGoals] = useState([]);
  const [progress, setProgress] = useState([]);
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const fetchGoalsProgressAndWorkoutPlan = async () => {
      try {
        const [goalsResponse, progressResponse, workoutPlanResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/goals'),
          axios.get('http://localhost:8080/api/progress'),
          axios.get('http://localhost:8080/api/workoutplans')
        ]);

        setGoals(goalsResponse.data);
        setProgress(progressResponse.data);
        setWorkoutPlan(workoutPlanResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchGoalsProgressAndWorkoutPlan();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString();
      setCurrentTime(time);
    };

    // Update time every second
    const interval = setInterval(updateTime, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Data for different charts
  const goalsData = [
    { name: 'Goal', value: goals.length },
    { name: 'Remaining', value: 100 - goals.length }
  ];

  const progressData = [
    { name: 'Progress', value: progress.length },
    { name: 'Remaining', value: 100 - progress.length }
  ];

  const workoutPlanData = [
    { subject: 'Strength', value: workoutPlan.length },
    { subject: 'Endurance', value: 100 - workoutPlan.length },
    { subject: 'Flexibility', value: 50 }
  ];

  return (
    <Box display="flex" height="85vh" bgcolor="#fffff" color="#fff" overflow="hidden">
      {/* Sidebar */}
      <HomeSidebar style={{ minWidth: '300px' }} />

      {/* Dashboard Section - Time and Goal, Progress, Workout Plan */}
      <Box
        display="flex"
        flexDirection="column"
        bgcolor="#ebebeb"
        borderRadius={2}
        p={5}
        style={{
          width: 'calc(100% - 250px)',
          marginLeft: '-100px',
          top: '100px',
          zIndex: 1000,
          marginTop: '30px',
          marginBottom: '-30px',
        }}
      >
        {/* Time Section - Current Time */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          bgcolor="#fff" // White background for the time box
          borderRadius={2}
          p={3} // Padding around the time
          mb={3} // Margin at the bottom
          sx={{ minHeight: '120px', width: '100%' }} // Prevent resizing, fixed height
        >
          <Typography variant="h6" fontWeight="600" color="#000" align="center" mb={1}>
            Current Time
          </Typography>
          <Typography variant="h4" fontWeight="700" color="#021a3a" align="center">
            {currentTime}
          </Typography>
        </Box>

        {/* Dashboard Section - Goal, Progress, Workout Plan Side by Side */}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          {/* Goal Section - LineChart */}
          <Box
            flex={1}
            minWidth="280px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            mx={2}
            bgcolor="#fff" // White background for the chart box
            borderRadius={2}
            p={3} // Padding around the chart
          >
            <Typography variant="h6" fontWeight="600" color="#000" align="center" mb={2}>
              My Goals
            </Typography>
            <Typography variant="h4" fontWeight="700" color="#021a3a" align="center">
              {goals.length} Goals
            </Typography>
            <Divider sx={{ my: 2, bgcolor: '#444' }} />
            
            {/* Goal Line Chart */}
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={goalsData}>
                <Line type="monotone" dataKey="value" stroke="#021a3a" strokeWidth={2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
              </LineChart>
            </ResponsiveContainer>

            <Button variant="contained" sx={{ backgroundColor: '#021a3a' }} fullWidth>
              View Goals
            </Button>
          </Box>

          {/* Progress Section - BarChart */}
          <Box
            flex={1}
            minWidth="280px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            mx={2}
            bgcolor="#fff" // White background for the chart box
            borderRadius={2}
            p={3} // Padding around the chart
          >
            <Typography variant="h6" fontWeight="600" color="#000" align="center" mb={2}>
              My Progress
            </Typography>
            <Typography variant="h4" fontWeight="700" color="#021a3a" align="center">
              {progress.length} Records
            </Typography>
            <Divider sx={{ my: 2, bgcolor: '#444' }} />
            
            {/* Progress Bar Chart */}
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#021a3a" />
              </BarChart>
            </ResponsiveContainer>

            <Button variant="contained" sx={{ backgroundColor: '#021a3a' }} fullWidth>
              View Progress
            </Button>
          </Box>

          {/* Workout Plan Section - RadarChart */}
          <Box
            flex={1}
            minWidth="280px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            mx={2}
            bgcolor="#fff" // White background for the chart box
            borderRadius={2}
            p={3} // Padding around the chart
          >
            <Typography variant="h6" fontWeight="600" color="#000" align="center" mb={2}>
              My Workout Plan
            </Typography>
            <Typography variant="h4" fontWeight="700" color="#021a3a" align="center">
              {workoutPlan.length} Plans
            </Typography>
            <Divider sx={{ my: 2, bgcolor: '#444' }} />
            
            {/* Workout Plan Radar Chart */}
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart outerRadius="80%" width={730} height={250} data={workoutPlanData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0]} />
                <Radar name="Workout Plan" dataKey="value" stroke="#021a3a" fill="#021a3a" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>

            <Button variant="contained" sx={{ backgroundColor: '#021a3a' }} fullWidth>
              View Workout Plan
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Time Period Selector Section */}
      <Box
        display="flex"
        flexDirection="column"
        bgcolor="#eee"
        borderRadius={2}
        p={5}
        style={{
          width: '300px',
          marginLeft: '20px',
          top: '64px',
          zIndex: 1000,
        }}
      >
        <Typography variant="h6" fontWeight="600" color="black" align="center" mb={2}>
          Time Period
        </Typography>

        {/* Time Period Buttons */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <Button variant="outlined" sx={{ color: '#021a3a', borderColor: '#021a3a', mb: 1 }}>
            Day
          </Button>
          <Button variant="outlined" sx={{ color: '#021a3a', borderColor: '#021a3a', mb: 1 }}>
            Month
          </Button>
          <Button variant="outlined" sx={{ color: '#021a3a', borderColor: '#021a3a' }}>
            Year
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        bgcolor="#1a1d23"
        px={5}
        py={3}
        marginTop="100px"
        style={{
          flexGrow: 1,
          flexShrink: 1,
          marginLeft: '600px',
          overflowX: 'hidden',
        }}
      >
        {/* Main Content goes here */}
      </Box>
    </Box>
  );
};

export default Home;
