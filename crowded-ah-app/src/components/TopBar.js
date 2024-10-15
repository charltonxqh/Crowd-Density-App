import React from 'react';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="top-bar">
      <input
        type="text"
        placeholder="Search for MRT Station"
        className="search-bar"
      />
      <div className="profile-pic">
        <img src="./images/profile_pic.png" alt="Profile" />
      </div>
    </div>
  );
};

export default TopBar;