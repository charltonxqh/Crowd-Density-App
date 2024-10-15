import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';

const TopBar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  // Toggle the visibility of the logout button
  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  // Handle logout and redirect to the login page
  const handleLogout = () => {
    // Perform any necessary cleanup, like removing authentication tokens
    navigate('/login'); // Replace with your actual login route
  };

  return (
    <div className="top-bar">
      <input
        type="text"
        placeholder="Search for MRT Station"
        className="search-bar"
      />
      <div className="profile-icon">
        <img 
          src="./images/profile_pic.png" 
          alt="Profile" 
          onClick={toggleLogout}
        />
        {showLogout && (
          <div className="logout-popup">
            <button className="logout-button" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
