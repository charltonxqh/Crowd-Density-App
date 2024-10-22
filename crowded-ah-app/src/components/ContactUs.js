import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
    return (
        <div className="contact-container">
            <div className="contact-details">
                <h1>Contact Us</h1>
                <div className="contact-item">
                    <img src="/images/mail.png" alt="Email" className="contact-icon" />
                    <div className="contact-item-content">
                        <p>support@crowdedah.sg</p>
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
                <form className="contact-form">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Your name..." />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Your email..." />

                    <label htmlFor="subject">I have a question about...</label>
                    <select id="subject">
                        <option value="">Select one...</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Support</option>
                        <option value="feedback">Feedback</option>
                    </select>

                    <textarea 
                        id="message" 
                        rows="4" 
                        placeholder="What can we help you with?"
                    ></textarea>

                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;


