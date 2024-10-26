import React from 'react';
import SwipePage from './SwipePage';
import './AboutUs.css';
import {Page1Dots, Page2Dots, Page3Dots, Page4Dots, Page5Dots, Page6Dots, Page7Dots} from '../components/AboutUsNav'
import AboutUsBottomImage from '../components/AboutUsBottomImage'


const Page1 = () =>  {
    return (
      <SwipePage nextPage="/about-us/page2" prevPage="/about-us/page7">
        <div className="app-container">   
          <header className = "number">
            <h1>01</h1>
          </header>
          <section className="Content">
            <div className="content-box">
              <h3>Purpose & Mission</h3>
              <p>Our mission is to transform the daily commute for Singaporeans by providing real-time insights and predictive data on MRT station crowd levels and train arrivals.</p>
              <p>We aim to reduce stress and save time by empowering commuters with the information they need to make informed travel decisions.</p>
              <Page1Dots/>
            </div>
          </section>
          <AboutUsBottomImage/>
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
              <p>The idea for our app was born out of our own experiences as daily commuters in Singapore. </p>
              <p>We noticed that navigating the MRT system during peak hours can be overwhelming, with little information available about crowd levels until you’re already on the platform.</p>
              <p>We wanted to create a solution that helps commuters plan their journeys better, avoiding overcrowded stations and trains whenever possible.</p>
              <Page2Dots/>
            </div>
          </section>
          <AboutUsBottomImage/>
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
            <h3>Team Introduction</h3>
            <p>Our team is made up of passionate web app developers - all with a deep connection to Singapore.</p>
            <p>Led by our group leader Charlton, we’re committed to making public transportation more efficient and accessible for everyone.</p>
            <Page3Dots/>
          </div>
        </section>
        <AboutUsBottomImage/>
      </div>
    </SwipePage>
  );
}

const Page4 = () =>{
  return(
    <SwipePage nextPage="/about-us/page5" prevPage="/about-us/page3"> 
      <div className="app-container">
        <header className = "number">
          <h1>04</h1>
        </header>
  
        {/* Purpose n mission */}
        <section className="Content">
          <div className="content-box">
            <h3>Key Features</h3>
            <p>Our app offers a suite of features designed to improve your commuting experience, including:</p>
            <p>Real-Time Crowd Levels: Know how crowded your MRT station is before you arrive.</p>
            <p>Forecasted Crowd Levels: Plan ahead with predictions based on historical data and current trends.</p>
            <p>Train Arrival Timings: Never miss a train with up-to-the-minute arrival times.</p>
            <p>Manual Updates for Special Events: Stay informed during special events like concerts or parades, where stations may be exceptionally crowded.</p> 
            <Page4Dots/>
          </div>
        </section>
        <AboutUsBottomImage/>
      </div>
    </SwipePage>
  );
}

const Page5 = () =>{
  return(
    <SwipePage nextPage="/about-us/page6" prevPage="/about-us/page4"> 
      <div className="app-container">
        <header className = "number">
          <h1>05</h1>
        </header>
  
        {/* Purpose n mission */}
        <section className="Content">
          <div className="content-box">
            <h3>Vision for the Future</h3>
            <p>Looking ahead, we plan to expand our service to include bus interchange crowd levels and integrate with smart city initiatives.</p>
            <p>Our vision is to become a comprehensive platform that enhances urban mobility across Singapore, making public transport a more seamless and enjoyable experience.</p>
            <Page5Dots/>
          </div>
        </section>
        <AboutUsBottomImage/>
      </div>
    </SwipePage>
  );
}

const Page6 = () =>{
    return(
      <SwipePage nextPage="/about-us/page7" prevPage="/about-us/page5">
        <div className="app-container">
          <header className = "number">
            <h1>06</h1>
          </header>
          <section className="Content">
            <div className="content-box">
              <h3>User-Centric Focus</h3>
              <p>We believe that our users are the heart of everything we do. That’s why we continuously gather feedback to refine our features and introduce new ones that better meet your needs. </p>
              <p>Your feedback has been instrumental in shaping our app, and we’re committed to listening to you as we grow.</p>
              <Page6Dots/>
            </div>
          </section>
          <AboutUsBottomImage/>
        </div>
      </SwipePage>
    );
  }
  
const Page7 = () =>{
    return(
      <SwipePage nextPage="/about-us" prevPage="/about-us/page6">
        <div className="app-container">
          <header className = "number">
            <h1>07</h1>
          </header>
          <section className="Content">
            <div className="content-box">
              <h3>Call to Action</h3>
              <p>Join thousands of Singaporeans in making smarter travel choices.</p>
              <p>Download our app today, and follow us on social media for the latest updates, tips, and announcements. </p>
              <p>Have a suggestion? We’d love to hear from you—reach out to us anytime!</p>
              <Page7Dots/>
            </div>
          </section>
          <AboutUsBottomImage/>
        </div>
      </SwipePage>
    );
}


export { Page1, Page2, Page3, Page4, Page5, Page6, Page7 };