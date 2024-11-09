/**
 * @fileoverview AboutUsPages component serves as the place to store contents for our About Us UI
 * @author Meagan Eng Pei Ying
 */

import React from 'react';
import SwipePage from './SwipePage';
import './AboutUs.css';
import { Page1Dots, Page2Dots, Page3Dots, Page4Dots, Page5Dots, Page6Dots, Page7Dots } from '../components/AboutUsNav';
import AboutUsBottomImage from '../components/AboutUsBottomImage'



/**
 * AboutUsPage component serves as a template for each page in the About Us section.
 * It accepts props for navigation, page number, title, content, and a dots component for page indicators.
 *
 * @component
 * @param {Object} props - Props for the AboutUsPage component.
 * @param {string} props.nextPage - URL path for the next page.
 * @param {string} props.prevPage - URL path for the previous page.
 * @param {string} props.pageNum - Current page number displayed in the header.
 * @param {string} props.title - Title for the page content.
 * @param {JSX.Element} props.content - Page-specific content.
 * @param {JSX.Element} props.DotsComponent - Component for page navigation dots.
 * @returns {JSX.Element} Rendered AboutUsPage component.
 */

const AboutUsPage = ({ nextPage, prevPage, pageNum, title, content, DotsComponent }) => (
  <SwipePage nextPage={nextPage} prevPage={prevPage}>
    <div className="app-container">
      <header className="number">
        <h1>{pageNum}</h1>
      </header>
      <section className="Content">
        <div className="content-box">
          <h3>{title}</h3>
          {content}
          <DotsComponent />
        </div>
      </section>
      <AboutUsBottomImage />
    </div>
  </SwipePage>
);

/**
 * Page1 component renders the first page of the About Us section, covering the app's purpose and mission.
 *
 * @component
 * @returns {JSX.Element} Rendered Page1 component.
 */

const Page1 = () => (
  <AboutUsPage
    nextPage="/about-us/page2"
    prevPage="/about-us/page7"
    pageNum="01"
    title="Purpose & Mission"
    content={
      <>
        <p>Our mission is to transform the daily commute for Singaporeans by providing real-time insights and predictive data on MRT station crowd levels and train arrivals.</p>
        <p>We aim to reduce stress and save time by empowering commuters with the information they need to make informed travel decisions.</p>
      </>
    }
    DotsComponent={() => <Page1Dots />}
  />
);

// Additional Page components follow the same pattern as Page1, with unique titles and content for each page.

/**
 * Page2 component renders the second page of the About Us section, describing the app's background story.
 *
 * @component
 * @returns {JSX.Element} Rendered Page2 component.
 */

const Page2 = () => (
  <AboutUsPage
    nextPage="/about-us/page3"
    prevPage="/about-us"
    pageNum="02"
    title="Background Story"
    content={
      <>
        <p>The idea for our app was born out of our own experiences as daily commuters in Singapore.</p>
        <p>We noticed that navigating the MRT system during peak hours can be overwhelming, with little information available about crowd levels until you’re already on the platform.</p>
        <p>We wanted to create a solution that helps commuters plan their journeys better, avoiding overcrowded stations and trains whenever possible.</p>
      </>
    }
    DotsComponent={() => <Page2Dots />}
  />
);

/**
 * Page3 component renders the third page, introducing the development team.
 *
 * @component
 * @returns {JSX.Element} Rendered Page3 component.
 */

const Page3 = () => (
  <AboutUsPage
    nextPage="/about-us/page4"
    prevPage="/about-us/page2"
    pageNum="03"
    title="Team Introduction"
    content={
      <>
        <p>Our mission is to transform the daily commute forOur team is made up of passionate web app developers - all with a deep connection to Singapore.</p>
        <p>Led by our group leader Charlton, we’re committed to making public transportation more efficient and accessible for everyone.</p>
      </>
    }
    DotsComponent={() => <Page3Dots />}
  />
);

/**
 * Page4 component renders the fourth page, listing key features of the app.
 *
 * @component
 * @returns {JSX.Element} Rendered Page4 component.
 */

const Page4 = () => (
  <AboutUsPage
    nextPage="/about-us/page5"
    prevPage="/about-us/page3"
    pageNum="04"
    title="Key Features"
    content={
      <>
        <p>Our app offers a suite of features designed to improve your commuting experience, including:</p>
        <p>Real-Time Crowd Levels: Know how crowded your MRT station is before you arrive.</p>
        <p>Forecasted Crowd Levels: Plan ahead with predictions based on historical current data.</p>
        <p>Train Arrival Timings: Never miss a train with up-to-the-minute arrival times.</p>
        <p>Manual Updates for Special Events: Stay informed during special events like concerts or parades, where stations may be exceptionally crowded.</p> 
      </>
    }
    DotsComponent={() => <Page4Dots />}
  />
);

/**
 * Page5 component renders the fifth page, outlining the app's future vision.
 *
 * @component
 * @returns {JSX.Element} Rendered Page5 component.
 */

const Page5 = () => (
  <AboutUsPage
    nextPage="/about-us/page6"
    prevPage="/about-us/page4"
    pageNum="05"
    title="Vision for the Future"
    content={
      <>
        <p>Looking ahead, we plan to expand our service to include bus interchange crowd levels and integrate with smart city initiatives.</p> 
        <p>Our vision is to become a comprehensive platform that enhances urban mobility across Singapore, making public transport a more seamless and enjoyable experience.</p>
      </>
    }
    DotsComponent={() => <Page5Dots />}
  />
);

/**
 * Page6 component renders the sixth page, emphasizing the app's user-centric focus.
 *
 * @component
 * @returns {JSX.Element} Rendered Page6 component.
 */

const Page6 = () => (
  <AboutUsPage
    nextPage="/about-us/page7"
    prevPage="/about-us/page5"
    pageNum="06"
    title="User-Centric Focus"
    content={
      <>
        <p>We believe that our users are the heart of everything we do. That’s why we continuously gather feedback to refine our features and introduce new ones that better meet your needs. </p>
        <p>Your feedback has been instrumental in shaping our app, and we’re committed to listening to you as we grow.</p>
      </>
    }
    DotsComponent={() => <Page6Dots />}
  />
);

/**
 * Page7 component renders the final page, including a call to action for app users.
 *
 * @component
 * @returns {JSX.Element} Rendered Page7 component.
 */
const Page7 = () => (
  <AboutUsPage
    nextPage="/about-us"
    prevPage="/about-us/page6"
    pageNum="07"
    title="Call to Action"
    content={
      <>
        <p>Join thousands of Singaporeans in making smarter travel choices.</p>
        <p>Download our app today, and follow us on social media for the latest updates, tips, and announcements. </p>
        <p>Have a suggestion? We’d love to hear from you—reach out to us anytime!</p>
      </>
    }
    DotsComponent={() => <Page7Dots />}
  />
);

export { Page1, Page2, Page3, Page4, Page5, Page6, Page7 };