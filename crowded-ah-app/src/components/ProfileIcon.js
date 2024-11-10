/**
 * @fileoverview ProfileIcon component displays a user profile icon and provides options for logging in, logging out, and changing username.
 * Depending on the user's guest status, it allows users to log in or log out and update their username if logged in with a registered account.
 * Provides a toggle for visibility of logout and username update options in a pop-up format on icon click.
 * @author Leow Yi Shian
 */

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGuest } from "../components/GuestContext";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import "./ProfileIcon.css";

/**
 * ProfileIcon component displaying a user profile icon.
 * Allows guest users to log in, and registered users to log out and update their username.
 *
 * @component
 */
const ProfileIcon = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const navigate = useNavigate();
  const { isGuest } = useGuest();
  const auth = getAuth();
  const db = getFirestore();
  const profileRef = useRef(null);

  /**
   * Toggles visibility of the logout and username input options.
   */
  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  /**
   * Logs out the current user and navigates back to the home page.
   * @async
   */
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  /**
   * Updates the username for the current user in the database.
   * Displays an alert on success or prompts the user to enter a new username if empty.
   * @async
   */
  const handleUsernameChange = async () => {
    const user = auth.currentUser;
    if (user && newUsername) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { username: newUsername });
        alert("Username updated successfully!");
        setNewUsername("");
        setShowUsernameInput(false);
      } catch (error) {
        console.error("Error updating username: ", error);
      }
    } else {
      alert("Please enter a new username.");
    }
  };

  /**
   * Hides the logout and username input options when a click occurs outside the component.
   * @param {Event} event - The mouse click event.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowLogout(false);
        setShowUsernameInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="profile-icon" ref={profileRef}>
      <img
        src={isGuest ? "/images/guest_pic.png" : "/images/profile_pic.png"}
        alt="Profile"
        onClick={toggleLogout}
      />

      {showLogout && (
        <div className="auth-popup">
          <button
            className={`auth-button ${isGuest ? "" : "logout-button"}`}
            onClick={handleLogout}
          >
            {isGuest ? "Log In" : "Log Out"}
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
                  <button
                    className="auth-button"
                    onClick={handleUsernameChange}
                  >
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
