import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import '../components/AuthForm.css';
import './Authentication.css'

const LoginSignup = () => {
    const [mode, setMode] = useState('login');  // Manage the mode (login or signup)

    const handleSubmit = (formData) => {
        console.log('Form submitted:', formData);
        // Add your login/signup handling logic here
    };

    return (
        <div className="auth-container">
            <div className="header">
                <img src='/images/Logo.png' alt="Logo Icon" className="logo-image" />
                <h1>{mode === 'signup' ? 'SIGN UP' : 'LOGIN'}</h1>
            </div>

            <AuthForm mode={mode} onSubmit={handleSubmit} />

            <p className="signup-prompt">
                {mode === 'login' ? 'Not yet registered?' : 'Already have an account?'}{' '}
                <span
                    className="signup-link"
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                >
                    {mode === 'login' ? 'Sign Up now' : 'Login'}
                </span>
            </p>
        </div>
    );
};

export default LoginSignup;