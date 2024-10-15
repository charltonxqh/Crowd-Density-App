import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // or 'next/router' for Next.js

const ProfileIcon = () => {
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();

    // Toggle the visibility of the logout button
    const toggleLogout = () => {
        setShowLogout(!showLogout);
    };

    // Handle logout and redirect to the login page
    const handleLogout = () => {
        // Perform any necessary cleanup, like removing authentication tokens
        // Then redirect to the login page
        navigate.push('/login'); // Replace with your login page route
    };

    return (
        <div className="profile-icon">
            <img
                src="profile-pic.png"
                alt="Profile"
                onClick={toggleLogout}
                style={{ cursor: 'pointer', width: '50px' }}
            />
            
            {showLogout && (
                <div className="logout-popup">
                    <button className="logout-button" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileIcon;
