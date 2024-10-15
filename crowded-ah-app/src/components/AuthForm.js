import React, { useState } from 'react';

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
        </div>
    );
};

export default AuthForm;
