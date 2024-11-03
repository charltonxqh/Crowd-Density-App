import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactUs.css';

const ContactUs = () => {
    const form = useRef();
    const [error, setError] = useState('');
    const [isSent, setIsSent] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
    
        const name = form.current.from_name.value;
        const email = form.current.from_email.value;
        const subject = form.current.subject.value;
        const message = form.current.message.value;
    
        if (!name || !email || !subject || !message) {
            setError('Please fill out all fields.');
            return;
        }
    
        setError('');
    
        emailjs
            .sendForm('service_jnfw9ef', 'template_aylqgfr', form.current, {
                publicKey: 'GIXDGeo-T3ZjwqMg7',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    setIsSent(true);
                    form.current.reset();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    setError('Failed to send the message. Please try again.');
                }
            );
    };    

    const closePopup = () => {
        setIsSent(false);
    };
    
    return (
        <div className="contact-container">
            <div className="contact-details">
                <h1>Contact Us</h1>
                <div className="contact-item">
                    <img src="/images/mail.png" alt="Email" className="contact-icon" />
                    <div className="contact-item-content">
                        <p>crowdedah@gmail.com</p>
                    </div>
                </div>
                <div className="contact-item">
                    <img src="/images/phone.png" alt="Phone" className="contact-icon" />
                    <div className="contact-item-content">
                        <p>+65 8888 8888</p>
                        <p>Monday-Friday 9:00 - 18:00 SGT</p>
                    </div>
                </div>
                <div className="contact-item">
                    <img src="/images/location.png" alt="Location" className="contact-icon" />
                    <div className="contact-item-content">
                        <p>101 Cecil Street</p>
                        <p>#20-04 Tong Eng Building</p>
                        <p>069533 Singapore</p>
                    </div>
                </div>
            </div>
            <div className="contact-form-container">
                <h1>Send a Message</h1>
                <form className="contact-form" ref={form} onSubmit={sendEmail}>
                    {error && <p className="error-message">{error}</p>}
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="from_name" placeholder="Your name..." />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="from_email" placeholder="Your email..." />
                    <label htmlFor="subject">Subject</label>
                    <select id="subject" name="subject">
                        <option value="">Select one...</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Support</option>
                        <option value="feedback">Feedback</option>
                    </select>
                    <label>Message</label>
                    <textarea name="message" id="message" rows="4" placeholder="What can we help you with?" />
                    <button type="submit" value="Send">Send</button>
                </form>
            </div>

            {isSent && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Your message has been successfully sent!</p>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactUs;

