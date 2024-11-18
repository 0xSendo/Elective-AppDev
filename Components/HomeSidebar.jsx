import React, { useState } from 'react';
import './HomePage2.css';
import { Link } from 'react-router-dom';

const HomeSidebar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const blog1 = [
    {
      name: "Warriors of the Week: Week 4 'NBA Cup' Edition ",
      gif: "https://cdn.nba.com/teams/uploads/sites/1610612744/2024/11/feat-image_-warrior-of-week-20241112.png",
      description: "Stephen Curry scored the final 12 points for the Warriors to will them to a 120-117 victory over Klay Thompson and the Dallas Mavericks at Chase Center on Tuesday. Curry's 28-foot step-back 3-pointer with 27.5 seconds left gave the Warriors a four-point lead and his game-sealing free throws capped a season-high 37-point outing."
    }
  ];
  const blog2 = [
  {
    name: "Does cycle syncing, planning workouts around periods improve fitness?",
    gif: "https://images.firstpost.com/uploads/2023/06/woman-2250970_1280.jpg?im=Resize,width=720,aspect=fit,type=normal",
    description: "According to professional athletes and fitness influencers, timing training around their menstrual cycles offers big benefits. However, experts claim that the research on whether this training routine improves fitness, much alone assists in other areas of life, is too inconsistent to be convincing."
  }
];
  const blog3 = [
{
  name: "November Wellness Newsletter",
    gif: "https://osdblog.osd.wednet.edu/wp-content/uploads/2016/11/wellness-newsletter-november-2016_page_2.jpg",
    description: "Don’t miss this month’s issue of “Wellness is a Way of Life!” newsletter. The newsletter is provided by the Child Nutrition department as a wellness resource for all employees.."
}
  ];

  const handleProfileHover = () => {
    setIsModalVisible(true);
  };

  const handleProfileLeave = () => {  
    setIsModalVisible(false);
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
            <Link to="/recent"><p>Recent Activity</p></Link>
          </div>
        </div>

        {/* Main Content (add more content here) */}
        <div className="balance-container">
        <h2 style={{ marginTop: '40px', marginLeft: '20px' }}>Sports News</h2>
              {blog1.map((blog1, index) =>(
                <div key={index} className="exercise-card">
                <h3>{blog1.name}</h3>
                <div className="gif-container">
                  <img src={blog1.gif} alt={`${blog1.name} gif`} />
                </div>
                <p>{blog1.description}</p>
              </div>
              ))}
              </div>

          <div className="balance-container">
        <h2 style={{ marginTop: '40px', marginLeft: '20px' }}>Exercise News</h2>
              {blog2.map((blog2, index) =>(
                <div key={index} className="exercise-card">
                <h3>{blog2.name}</h3>
                <div className="gif-container">
                  <img src={blog2.gif} alt={`${blog2.name} gif`} />
                </div>
                <p>{blog2.description}</p>
              </div>
              ))}
              </div>
              <div className="balance-container">
        <h2 style={{ marginTop: '40px', marginLeft: '20px' }}>Food News</h2>
              {blog3.map((blog3, index) =>(
                <div key={index} className="exercise-card">
                <h3>{blog3.name}</h3>
                <div className="gif-container">
                  <img src={blog3.gif} alt={`${blog3.name} gif`} />
                </div>
                <p>{blog3.description}</p>
              </div>
              ))}
              </div>
      </div>
    

    <style jsx>{`
      .balance-container {
        text-align: center;
        padding: 20px;
        color: #2b2d42;
      }
      .exercise-card {
          background-color: #f0f0f0;
          border-radius: 8px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          padding: 20px;
          text-align: justify;
          transition: transform 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 400px; /* Increased width for larger cards */
          height: 540px; /* Increased height for better gif visibility */
        }  
      .balance-container1 {
        text-align: center;
        padding: 20px;
        color: #2b2d42;
      }
      .exercise-card1 {
          background-color: #f0f0f0;
          border-radius: 8px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          padding: 20px;
          text-align: justify;
          transition: transform 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 400px; /* Increased width for larger cards */
          height: 540px; /* Increased height for better gif visibility */
        }  
          .balance-container2 {
        text-align: center;
        padding: 20px;
        color: #2b2d42;
      }
      .exercise-card2 {
          background-color: #f0f0f0;
          border-radius: 8px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          padding: 20px;
          text-align: justify;
          transition: transform 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 400px; /* Increased width for larger cards */
          height: 540px; /* Increased height for better gif visibility */
        }
        `}</style>
        </div>
  );
};

export default HomeSidebar;
