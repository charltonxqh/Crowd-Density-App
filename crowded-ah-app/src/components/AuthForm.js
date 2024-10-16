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
            <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
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
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
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

            <p className="signup-prompt">
                not yet registered? <span className="signup-link">Sign Up now</span>
            </p>
        </div>
    );
};

export default AuthForm;
