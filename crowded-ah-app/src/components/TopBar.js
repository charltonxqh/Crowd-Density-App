import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';

const TopBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  }

  const clearSearch = () => {
    setSearchQuery('');
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('/station/${serachQuery}')
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className="top-bar">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for MRT Station"
          className="search-bar"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {searchQuery && (
            <div className="clear-icon" onClick={clearSearch}>
              &times; {/* "×" symbol for clearing */}
            </div>
          )}
          <div className="search-icon" onClick={handleSearch}>
            &#128269;
          </div>
      </div>
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
