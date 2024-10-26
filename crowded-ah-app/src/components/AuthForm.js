import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase.js';

const AuthForm = ({ mode, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isSignup = mode === 'signup';
    const isLogin = mode === 'login';
    const navigate = useNavigate(); // Get the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignup) {
                // Check if passwords match for signup
                if (password !== confirmPassword) {
                    throw new Error("Passwords do not match");
                }
                // Create user account
                await createUserWithEmailAndPassword(auth, email, password);
                console.log("User signed up successfully");
                navigate('/home');
            } else if (isLogin) {
                // Sign in existing user
                await signInWithEmailAndPassword(auth, email, password);
                console.log("User logged in successfully");
                navigate('/home');
            }
        } catch (error) {
            console.error("Error:", error.message);
            alert(`Error: ${error.message}`); // Display the error to the user
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            alert("Please enter your email address to reset your password.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset email sent! Please check your inbox.");
        } catch (error) {
            console.error("Error resetting password:", error.message);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="auth-form">
            <form onSubmit={handleSubmit}>
                {isSignup && (
                    <div className="input-container">
                        <img src='/images/username.png' alt="Username Icon" className="input-icon" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div className="input-container">
                    <img src='/images/email.png' alt="Email Icon" className="input-icon" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <img src='/images/password.png' alt="Password Icon" className="input-icon" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {isSignup && (
                    <div className="input-container">
                        <img src='/images/password.png' alt="Password Icon" className="input-icon" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                )}

                {isLogin && (
                    <p className="forgot-password" onClick={handleForgotPassword}>
                        Forgot password?
                    </p>
                )}
                
                <button className="button-submit" type="submit">
                    {isSignup ? 'Sign Up' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;