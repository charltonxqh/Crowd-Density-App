import React, { useState } from 'react';

const AuthUI = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return setErrorMessage('Please enter both email and password.');
    if (!/\S+@\S+\.\S+/.test(email)) return setErrorMessage('Invalid email address.');

    authenticateUser(email, password);
  };

  const authenticateUser = (email, password) => {
    console.log('Authenticating:', email);
    setErrorMessage('');
  };

  return (
    <div className="auth-container">
      <h2>Login / Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AuthUI;
