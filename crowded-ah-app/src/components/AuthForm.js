import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AuthForm.css';

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
            await onSubmit({ email, password, username, confirmPassword });
            if (isLogin) {
                // Redirect to home page after successful login
                navigate('/'); // Use navigate to redirect
            }
        } catch (error) {
            console.error("Error logging in:", error);
            // Handle error (e.g., show a notification)
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
                    <p className="forgot-password">
                        Forgot password?
                    </p>
                )}
                
                <button className="button-submit" type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
            </form>
        </div>
    );
};

export default AuthForm;