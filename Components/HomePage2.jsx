import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeSidebar from './HomeSidebar';  // Import HomeSidebar
import { Button, Grid, Typography, Box, Paper } from '@mui/material';

const HomePage2 = () => {
  const navigate = useNavigate();

  // Define route mapping
  const routes = {
    cardio: '/cardio',
    strength: '/strength',
    core: '/core',
    flexibility: '/flexibility',
    balance: '/balance',
    endurance: '/endurance',  // Added Endurance route
  };

  // Generic navigation function
  const handleJoin = (workout) => {
    navigate(routes[workout]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', marginLeft: '-px', marginTop: '-120px' }}>
      {/* Top Navigation Bar */}
      <header className="top-bar">
        <nav className="navbar">
          <div className="logo">
            {/* Logo can be placed here */}
          </div>
        </nav>
      </header>

      {/* Main content and sidebar wrapper */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar */}
        <HomeSidebar style={{ flexShrink: 0, width: '250px' }} />  {/* Sidebar with fixed width */}

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, padding: '20px', overflowY: 'auto', marginTop: '170px' }}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h4" component="h2" align="center" gutterBottom color="#021a3a" sx={{ marginBottom: '30px' }}>
              Exercises
            </Typography>

            <Grid container spacing={6} justifyContent="center"> {/* Increased spacing between items */}
              {/* Cardio */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 3, backgroundColor: '#021a3a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '400px' }}>
                  <Box
                    component="img"
                    src="src\\assets\\images\\cardio.jpg"  // Replace with actual image path
                    alt="Cardio"
                    sx={{ width: '100%', height: '60%', objectFit: 'cover', borderRadius: 2 }}
                  />
                  <Typography variant="h6" color="white">Cardio</Typography>
                  <Typography variant="body2" color="white" sx={{ mb: 2 }}>
                    <strong>Difficulty Level:</strong> <span style={{ color: 'green' }}><b>Easy</b></span>
                  </Typography>
                  <Typography variant="body2" color="white" paragraph>
                    Improves heart and lung health, burns calories, boosts stamina, and helps with weight management.
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />  {/* Empty box to push the button to the bottom */}
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleJoin('cardio')} 
                    fullWidth
                    sx={{
                      padding: '8px 16px',  // Smaller padding to reduce size
                      fontSize: '14px',  // Smaller font size
                      width: 'auto',  // Let the button resize based on its content
                      height: '30px',
                      marginTop: '-15px',  // Optional: to add some spacing if needed
                      backgroundColor: '#00E2FD',
                      color: 'black',
                    }}
                  >
                    Select
                  </Button>
                </Paper>
              </Grid>

              {/* Strength */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 3, backgroundColor: '#021a3a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '400px' }}>
                  <Box
                    component="img"
                    src="src\\assets\\images\\strength.jpg"  // Replace with actual image path
                    alt="Strength"
                    sx={{ width: '100%', height: '60%', objectFit: 'cover', borderRadius: 2 }}
                  />
                  <Typography variant="h6" color="white">Strength</Typography>
                  <Typography variant="body2" color="white" sx={{ mb: 2 }}>
                    <strong>Difficulty Level:</strong> <span style={{ color: '#F96E2A' }}><b>Intermediate</b></span>
                  </Typography>
                  <Typography variant="body2" color="white" paragraph>
                    Increases muscle mass, strengthens bones, enhances metabolism, and improves overall functional strength.
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />  {/* Empty box to push the button to the bottom */}
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleJoin('strength')} 
                    fullWidth
                    sx={{
                      padding: '8px 16px',  // Smaller padding to reduce size
                      fontSize: '14px',  // Smaller font size
                      width: 'auto',  // Let the button resize based on its content
                      height: '30px',
                      marginTop: '-15px',  // Optional: to add some spacing if needed
                      backgroundColor: '#00E2FD', 
                      color: 'black',
                    }}
                  >
                    Select
                  </Button>
                </Paper>
              </Grid>

              {/* Core */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 3, backgroundColor: '#021a3a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '400px' }}>
                  <Box
                    component="img"
                    src="src\\assets\\images\\core.jpg"  // Replace with actual image path
                    alt="Core"
                    sx={{ width: '100%', height: '60%', objectFit: 'cover', borderRadius: 2 }}
                  />
                  <Typography variant="h6" color="white">Core</Typography>
                  <Typography variant="body2" color="white" sx={{ mb: 2 }}>
                    <strong>Difficulty Level:</strong> <span style={{ color: 'red' }}><b>Advanced</b></span>
                  </Typography>
                  <Typography variant="body2" color="white" paragraph>
                    Improves posture, supports balance, reduces risk of injury, and strengthens the torso for better functional movement.
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />  {/* Empty box to push the button to the bottom */}
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleJoin('core')} 
                    fullWidth
                    sx={{
                      padding: '8px 16px',  // Smaller padding to reduce size
                      fontSize: '14px',  // Smaller font size
                      width: 'auto',  // Let the button resize based on its content
                      height: '30px',
                      marginTop: '-15px',  // Optional: to add some spacing if needed
                      backgroundColor: '#00E2FD',
                      color: 'black',
                    }}
                  >
                    Select
                  </Button>
                </Paper>
              </Grid>

              {/* Flexibility */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 3, backgroundColor: '#021a3a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '400px' }}>
                  <Box
                    component="img"
                    src="src\\assets\\images\\flex.jpg"  // Replace with actual image path
                    alt="Flexibility"
                    sx={{ width: '100%', height: '60%', objectFit: 'cover', borderRadius: 2 }}
                  />
                  <Typography variant="h6" color="white">Flexibility</Typography>
                  <Typography variant="body2" color="white" sx={{ mb: 2 }}>
                    <strong>Difficulty Level:</strong> <span style={{ color: 'green' }}><b>Easy</b></span>
                  </Typography>
                  <Typography variant="body2" color="white" paragraph>
                    Enhances muscle elasticity, reduces stiffness, prevents injury, and improves posture and mobility.
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />  {/* Empty box to push the button to the bottom */}
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleJoin('flexibility')} 
                    fullWidth
                    sx={{
                      padding: '8px 16px',  // Smaller padding to reduce size
                      fontSize: '14px',  // Smaller font size
                      width: 'auto',  // Let the button resize based on its content
                      height: '30px',
                      marginTop: '-15px',  // Optional: to add some spacing if needed
                      backgroundColor: '#00E2FD',
                      color: 'black',
                    }}
                  >
                    Select
                  </Button>
                </Paper>
              </Grid>

              {/* Balance */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 3, backgroundColor: '#021a3a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '400px' }}>
                  <Box
                    component="img"
                    src="src\\assets\\images\\balance.jpg"  // Replace with actual image path
                    alt="Balance"
                    sx={{ width: '100%', height: '60%', objectFit: 'cover', borderRadius: 2 }}
                  />
                  <Typography variant="h6" color="white">Balance</Typography>
                  <Typography variant="body2" color="white" sx={{ mb: 2 }}>
                    <strong>Difficulty Level:</strong> <span style={{ color: '#F96E2A' }}><b>Intermediate</b></span>
                  </Typography>
                  <Typography variant="body2" color="white" paragraph>
                    Improves coordination, enhances functional strength, reduces the risk of falls, and strengthens stabilizing muscles.
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />  {/* Empty box to push the button to the bottom */}
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleJoin('balance')} 
                    fullWidth
                    sx={{
                      padding: '8px 16px',  // Smaller padding to reduce size
                      fontSize: '14px',  // Smaller font size
                      width: 'auto',  // Let the button resize based on its content
                      height: '30px',
                      marginTop: '-15px',  // Optional: to add some spacing if needed
                      backgroundColor: '#00E2FD',
                      color: 'black',
                    }}
                  >
                    Select
                  </Button>
                </Paper>
              </Grid>

              {/* Endurance */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 3, backgroundColor: '#021a3a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '400px' }}>
                  <Box
                    component="img"
                    src="src\\assets\\images\\endurance.jpg"  // Replace with actual image path
                    alt="Endurance"
                    sx={{ width: '100%', height: '60%', objectFit: 'cover', borderRadius: 2 }}
                  />
                  <Typography variant="h6" color="white">Endurance</Typography>
                  <Typography variant="body2" color="white" sx={{ mb: 2 }}>
                    <strong>Difficulty Level:</strong> <span style={{ color: 'red' }}><b>Advanced</b></span>
                  </Typography>
                  <Typography variant="body2" color="white" paragraph>
                    Improves stamina, boosts cardiovascular health, enhances lung capacity, and builds overall endurance for longer activities.
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />  {/* Empty box to push the button to the bottom */}
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleJoin('endurance')} 
                    fullWidth
                    sx={{
                      padding: '8px 16px',  // Smaller padding to reduce size
                      fontSize: '14px',  // Smaller font size
                      width: 'auto',  // Let the button resize based on its content
                      height: '30px',
                      marginTop: '-15px',  // Optional: to add some spacing if needed
                      backgroundColor: '#00E2FD',
                      color: 'black',
                    }}
                  >
                    Select
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage2;
