import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuest } from '../components/GuestContext';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import './AuthForm.css';

const AuthForm = ({ mode, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isSignup = mode === 'signup';
    const isLogin = mode === 'login';
    const navigate = useNavigate();
    const { setIsGuest } = useGuest();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const db = getFirestore();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!emailRegex.test(email)) {
                throw new Error("Invalid email format");
            }
            
            if (isSignup) {
                if (password !== confirmPassword) {
                    throw new Error("Passwords do not match");
                }
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                const userRef = doc(db, "users", user.uid);
                await setDoc(userRef, {
                    username: username,
                    favourites: []
                });
                
                await sendEmailVerification(user);
                alert("Verification email sent! Please check your inbox to verify your email before logging in.");

                setIsGuest(false);

            } else if (isLogin) {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                if (!user.emailVerified) {
                    throw new Error("Please verify your email address before logging in.");
                }

                setIsGuest(false);
                navigate('/home');
            }
        } catch (error) {
            console.error("Error:", error.message);
            alert(`Error: ${error.message}`);
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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsGuest(false);
                navigate('/home');
            }
        });
        
        return () => unsubscribe();
    }, [navigate, setIsGuest]);
    
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