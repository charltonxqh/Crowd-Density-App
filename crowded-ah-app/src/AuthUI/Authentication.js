import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuest } from '../components/GuestContext';
import AuthForm from '../components/AuthForm';
import './Authentication.css';

const Authentication = () => {
    const [mode, setMode] = useState('login');
    const navigate = useNavigate();
    const { setIsGuest } = useGuest();

    const handleSubmit = (formData) => {
        console.log('Form submitted:', formData);
    };

    const handleGuestContinue = () => {
        setIsGuest(true);
        navigate('/home');
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

            <button className="button-submit" onClick={handleGuestContinue}>
                Continue as Guest
            </button>

        </div>
    );
};

export default Authentication;