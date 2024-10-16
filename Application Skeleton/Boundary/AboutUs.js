import React from 'react';

const AboutUs = () => {
    const handleLearnMore = () => {
        // Logic for learning more about the application
        console.log('Learn more about us!');
    };

    return (
        <div>
            <h1>About Us</h1>
            <p>Welcome to our application! We aim to provide the best services to our users.</p>
            <button onClick={handleLearnMore}>Learn More</button>
        </div>
    );
};

export default AboutUs;
