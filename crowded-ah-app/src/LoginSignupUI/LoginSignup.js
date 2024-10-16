// import React, { useState } from 'react';
// import AuthForm from '../components/AuthForm';

// const LoginSignup = () => {
//     const [mode, setMode] = useState('login'); // Initial mode can be 'login' or 'signup'

//     const handleSubmit = (data) => {
//         console.log('Form submitted:', data); // Log the submitted data
//         // Here, you can add further logic like sending data to an API
//     };

//     return (
//         <div className="login-signup">
//             <AuthForm mode={mode} onSubmit={handleSubmit} />
//             <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
//                 Switch to {mode === 'login' ? 'Sign Up' : 'Login'}
//             </button>
//         </div>
//     );
// };

// export default LoginSignup;