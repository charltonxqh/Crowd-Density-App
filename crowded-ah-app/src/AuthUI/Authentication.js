/**
 * @fileoverview Authentication component provides a login and signup interface
 * with an option to continue as a guest user. It includes a form for user input and
 * dynamically switches between login and signup modes.
 * @author Leow Yi Shian
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGuest } from "../components/GuestContext";
import AuthForm from "../components/AuthForm";
import "./Authentication.css";

/**
 * Authentication component for user login, signup, and guest access.
 * 
 * @component
 */
const Authentication = () => {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();
  const { setIsGuest } = useGuest();

  /**
   * Handles form submission for login/signup.
   * Logs form data to the console.
   * @param {Object} formData - Data submitted from the authentication form
   */
  const handleSubmit = (formData) => {
    console.log("Form submitted:", formData);
  };

  /**
   * Sets guest mode to true and navigates to the home page.
   */
  const handleGuestContinue = () => {
    setIsGuest(true);
    navigate("/home");
  };

  return (
    <div className="auth-container">
      <div className="header">
        <img src="/images/Logo.png" alt="Logo Icon" className="logo-image" />
        <h1>{mode === "signup" ? "SIGN UP" : "LOGIN"}</h1>
      </div>
      <AuthForm mode={mode} onSubmit={handleSubmit} />
      <p className="signup-prompt">
        {mode === "login" ? "Not yet registered?" : "Already have an account?"}{" "}
        <span
          className="signup-link"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "Sign Up now" : "Login"}
        </span>
      </p>
      <button className="button-submit" onClick={handleGuestContinue}>
        Continue as Guest
      </button>
    </div>
  );
};

export default Authentication;
