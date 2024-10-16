import React, { useState } from 'react';
import './AuthForm.css';

const AuthForm = ({ mode, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isSignup = mode === 'signup';

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ email, password, username, confirmPassword });
    };

    return (
        <div className="auth-container">
            <div className="header">
                <img src='/images/Logo.png' alt="Logo Icon" className="logo-image" />
                <h1>{isSignup ? 'SIGN UP' : 'LOGIN'}</h1>
            </div>

            <div className="auth-form">
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
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
                    <p className="forgot-password">
                        Forgot password?
                    </p>
                    
                    {isSignup && (
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    )}
                    <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
                </form>
            </div>

            <p className="signup-prompt">
                not yet registered? <span className="signup-link">Sign Up now</span>
            </p>
        </div>
    );
};

export default AuthForm;
