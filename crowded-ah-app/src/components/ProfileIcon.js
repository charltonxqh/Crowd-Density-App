import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuest } from '../components/GuestContext';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import './ProfileIcon.css';

const ProfileIcon = () => {
    const [showLogout, setShowLogout] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [showUsernameInput, setShowUsernameInput] = useState(false);
    const navigate = useNavigate();
    const { isGuest } = useGuest();
    const auth = getAuth();
    const db = getFirestore();
    const profileRef = useRef(null);

    const toggleLogout = () => {
        setShowLogout(!showLogout);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Logout failed: ", error);
        }
    };

    const handleUsernameChange = async () => {
        const user = auth.currentUser;
        if (user && newUsername) {
            try {
                const userRef = doc(db, "users", user.uid);
                await updateDoc(userRef, { username: newUsername });
                alert('Username updated successfully!');
                setNewUsername('');
                setShowUsernameInput(false);
            } catch (error) {
                console.error("Error updating username: ", error);
            }
        } else {
            alert('Please enter a new username.');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowLogout(false);
                setShowUsernameInput(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="profile-icon" ref={profileRef}>
            <img
                src={isGuest ? '/images/guest_pic.png' : '/images/profile_pic.png'}
                alt="Profile"
                onClick={toggleLogout}
            />
            
            {showLogout && (
                <div className="auth-popup">
                    <button
                        className={`auth-button ${isGuest ? '' : 'logout-button'}`}
                        onClick={handleLogout}
                    >
                        {isGuest ? 'Log In' : 'Log Out'}
                    </button>
                    {!isGuest && (
                        <>
                            <button
                                className="auth-button"
                                onClick={() => setShowUsernameInput(!showUsernameInput)}
                            >
                                Change Username
                            </button>
                            {showUsernameInput && (
                                <div className="username-popup">
                                    <input
                                        type="text"
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                        placeholder="New Username"
                                        className="username-input"
                                    />
                                    <button className="auth-button" onClick={handleUsernameChange}>
                                        Confirm
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileIcon;
