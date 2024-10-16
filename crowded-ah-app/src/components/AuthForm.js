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
        <div className="auth-form">
            <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
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
    );
};

export default AuthForm;