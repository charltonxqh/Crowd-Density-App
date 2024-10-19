import React, { useState } from 'react';
import { handleSendMessage } from './HelpMessageController';

/**
 * Help UI Component
 * This component provides a contact form for users to send messages.
 * @returns The HTML elements to be displayed on the website.
 */
const HelpUI = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  /**
   * Resets the form fields
   */
  const resetForm = () => {
    setName('');
    setEmail('');
    setCategory('');
    setMessage('');
  };

  /**
   * Handles form submission
   * @param {Event} e - The form submit event
   */
  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const contactData = { name, email, category, message };
    handleSendMessage(contactData, resetForm);
  };

  return (
   <>
   </>
  );
};

export default HelpUI;
