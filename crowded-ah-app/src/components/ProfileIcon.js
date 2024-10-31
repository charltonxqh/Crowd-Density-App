import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuest } from '../components/GuestContext';
import { getAuth, signOut } from 'firebase/auth';
import './ProfileIcon.css';

const ProfileIcon = () => {
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();
    const { isGuest } = useGuest();
    const auth = getAuth();

    // Toggle the visibility of the logout button
    const toggleLogout = () => {
        setShowLogout(!showLogout);
    };

    // Handle logout and redirect to the login page
    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out from Firebase
            navigate('/'); // Redirect to the login page
        } catch (error) {
            console.error("Logout failed: ", error); // Handle error if necessary
        }
    };

    return (
        <div className="profile-icon">
            <img
                src={isGuest ? '/images/guest_pic.png' : '/images/profile_pic.png'}
                alt="Profile"
                onClick={toggleLogout}
            />
            
            {showLogout && (
                <div className="auth-popup">
                    <button className="auth-button" onClick={handleLogout}>
                        {isGuest ? 'Log In' : 'Log Out'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileIcon;