import React from 'react';
import SwipePage from './SwipePage';
import './About_us_styles.css';

const Page1 = () =>  {
    return (
      <SwipePage nextPage="/about-us/page2" prevPage="/about-us/page4">
        <div className="app-container">   
          <header className = "number">
            <h1>01</h1>
          </header>
    
          {/* Purpose n mission */}
          <section className="Content">
            <div className="content-box">
              <h3>Purpose & Mission</h3>
              <p>Our mission is to transform the daily commute for Singaporeans by providing real-time insights and predictive data on MRT station crowd levels and train arrivals.</p>
              <p>We aim to reduce stress and save time by empowering commuters with the information they need to make informed travel decisions.</p>

              {/* Slider Dots */}
              <div className="dots">
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </section>
    
          {/* Background Image Section */}
          <section className="image-section">
              <img src="/images/how-many-days-in-singapore.jpg" alt="MRT Bridge" className="bg-image" />
          </section>
        </div>
      </SwipePage>
    );
}

const Page2 = () =>{
    return(
      <SwipePage nextPage="/about-us/page3" prevPage="/about-us"> 
        <div className="app-container">
          <header className = "number">
            <h1>02</h1>
          </header>
    
          {/* Purpose n mission */}
          <section className="Content">
            <div className="content-box">
              <h3>Background Story</h3>
              <p>
              The idea for our app was born out of our own experiences as daily commuters in Singapore. 
              </p>
              <p>
              We noticed that navigating the MRT system during peak hours can be overwhelming, with little information available about crowd levels until you’re already on the platform.
              </p>
              <p>
              We wanted to create a solution that helps commuters plan their journeys better, avoiding overcrowded stations and trains whenever possible.
              </p>
              {/* Slider Dots */}
              <div className="dots">
                <span className="dot"></span>
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </section>
    
          {/* Background Image Section */}
          <section className="image-section">
            <img src="/images/how-many-days-in-singapore.jpg" alt="MRT Bridge" className="bg-image" />
          </section>
        </div>
      </SwipePage>
    );
}
  
  
const Page3 = () =>{
    return(
      <SwipePage nextPage="/about-us/page4" prevPage="/about-us/page2">
        <div className="app-container">
          <header className = "number">
            <h1>03</h1>
          </header>
    
          {/* Purpose n mission */}
          <section className="Content">
            <div className="content-box">
              <h3>User-Centric Focus</h3>
              <p>We believe that our users are the heart of everything we do. That’s why we continuously gather feedback to refine our features and introduce new ones that better meet your needs. </p>
              <p>Your feedback has been instrumental in shaping our app, and we’re committed to listening to you as we grow.</p>
              {/* Slider Dots */}
              <div className="dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot active"></span>
                <span className="dot"></span>
              </div>
            </div>
          </section>
    
          {/* Background Image Section */}
          <section className="image-section">
              <img src="/images/how-many-days-in-singapore.jpg" alt="MRT Bridge" className="bg-image" />
          </section>
        </div>
      </SwipePage>
    );
  }
  
const Page4 = () =>{
    return(
      <SwipePage nextPage="/about-us" prevPage="/about-us/page3">
        <div className="app-container">
          <header className = "number">
            <h1>04</h1>
          </header>

          {/* Purpose n mission */}
          <section className="Content">
            <div className="content-box">
              <h3>Call to Action</h3>
              <p>Join thousands of Singaporeans in making smarter travel choices.</p>
              <p>Download our app today, and follow us on social media for the latest updates, tips, and announcements. </p>
              <p>Have a suggestion? We’d love to hear from you—reach out to us anytime!</p>
              {/* Slider Dots */}
              <div className="dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot active"></span>
              </div>
            </div>
          </section>
    
          {/* Background Image Section */}
          <section className="image-section">
              <img src="/images/how-many-days-in-singapore.jpg" alt="MRT Bridge" className="bg-image" /> 
          </section>
        </div>
      </SwipePage>
    );
}

export { Page1, Page2, Page3, Page4 };