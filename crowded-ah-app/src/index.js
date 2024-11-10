/**
 * @fileoverview Main entry point for the React application. Sets up and renders the application root with necessary providers and routing.
 * Wraps the app with routing and context providers.
 * @author Choo Yi Ken
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { GuestProvider } from './components/GuestContext';

/**
 * Root element for rendering the application in the HTML DOM.
 * @constant {HTMLElement} root
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * Renders the application with React.StrictMode for highlighting potential issues, 
 * GuestProvider for managing guest user context, and Router for handling client-side routing.
 */
root.render(
  <React.StrictMode>
    <GuestProvider>
      <Router>
        <App />
      </Router>
    </GuestProvider>
  </React.StrictMode>
);

reportWebVitals();
