import React from 'react'
/**
 * Handles sending contact messages
 * Logs the contact information and resets the form fields.
 * 
 * @param {Object} contactData - The contact information
 * @param {Function} resetForm - Function to reset the form fields
 */
export const handleSendMessage = (contactData, resetForm) => {
    console.log('Contact Info:', contactData);
    // Placeholder for API call to send the data to your server
    sendContactData(contactData);
  
    // Reset form fields
    resetForm();
  };
  
  /**
   * Sends the contact data to the backend or API
   * 
   * @param {Object} contactData - The contact information
   */
  const sendContactData = (contactData) => {
    console.log('Sending contact data:', contactData);
  };
  