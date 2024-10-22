/*
import React, { useState } from 'react';
import './Faq.css';

const faqData = [
    {
        question: "How do I get access to LTA's API documentation online?",
        answer: `Visit the website https://datamall.lta.gov.sg/ and click on ‘Dynamic Datasets’
        on the selector above. You should see the Get API Button and request from the government. 
        You might have to fill in some personal details and then you are good to go!`
    },
    {
        question: 'How to send us a message?',
        answer: `At the bottom of the app, click on the ‘About Us’ option and you will see 
        a container entitled ‘Send Us a Message’. You can send us any message and our team will 
        reply within 24 hours!`
    },
    {
        question: 'What your app has to offer in comparison with CityMapper or GoogleMaps?',
        answer: `For our mobile app, it provides real-time crowd density data which both 
        CityMapper and GoogleMaps do not offer. Also, it provides you with accurate forecast about 
        the crowd density at each station, which helps a lot when you want to plan your trip ahead of time.`
    }
];

const Faq = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFaq = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="faq-container">
            <h1>Frequently Asked Questions</h1>
            <input
                type="text"
                placeholder="What can we help you with?"
                className="faq-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="faq-items">
                {filteredFaq.map((faq, index) => (
                    <div key={index} className="faq-item">
                        <h3>{faq.question}</h3>
                        <p>{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;
*/

import React, { useState } from 'react';
import './Faq.css';

const faqData = [
    {
        question: "How do I get access to LTA's API documentation online?",
        answer: `Visit the website https://datamall.lta.gov.sg/ and click on ‘Dynamic Datasets’
        on the selector above. You should see the Get API Button and request from the government. 
        You might have to fill in some personal details and then you are good to go!`
    },
    {
        question: 'How to send us a message?',
        answer: `At the bottom of the app, click on the ‘About Us’ option and you will see 
        a container entitled ‘Send Us a Message’. You can send us any message and our team will 
        reply within 24 hours!`
    },
    {
        question: 'What your app has to offer in comparison with CityMapper or GoogleMaps?',
        answer: `For our mobile app, it provides real-time crowd density data which both 
        CityMapper and GoogleMaps do not offer. Also, it provides you with accurate forecast about 
        the crowd density at each station, which helps a lot when you want to plan your trip ahead of time.`
    }
];

const Faq = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFaq = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="faq-container">
            <h1>Frequently Asked Questions</h1>
            <input
                type="text"
                placeholder="What can we help you with?"
                className="faq-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="faq-items">
                {filteredFaq.length > 0 ? (
                    filteredFaq.map((faq, index) => (
                        <li key={index} className="faq-item">
                            <h3>{faq.question}</h3>
                            <p>{faq.answer}</p>
                        </li>
                    ))
                ) : (
                    <li className="no-results">FAQ not found for "{searchTerm}"</li>
                )}
            </ul>
        </div>
    );
};

export default Faq;

