import React, { useState } from 'react';

const HelpUI = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [message, setMessage] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Info:', { name, email, questionType, message });
    setName('');
    setEmail('');
    setQuestionType('');
    setMessage('');
  };

  return (
    <div className="help-container">
      <h2>Contact Us</h2>
      <h3>Send Us a message</h3>
      <form onSubmit={handleContactSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          required
        />
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          required
        >
          <option value="" disabled>Select Type of Question</option>
        </select>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
          required
        />
        <button type="submit">Send</button>
      </form>

      <div className="contact-info">
        <p>Email: support@example.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 Example St, City, Country</p>
      </div>
    </div>
  );
};

export default HelpUI;
