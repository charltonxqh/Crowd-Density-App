import './App.css';
import NavBar from './NavBar/NavBar';
import PageIdentifierHeader from './components/PageIdentifierHeader';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import HomeUI from './HomeUI/home'
import Authentication from './AuthUI/Authentication'
import Stations from './StationsUI/Stations'
import StatisticsUI from './StatisticsUI'
import NotificationsUI from './NotificationsUI'
import HelpUI from './HelpUI'
import AboutUsUI from './AboutUsUI/index'
import { Page1, Page2, Page3, Page4, Page5, Page6, Page7} from './AboutUsUI/AboutUsPages'

function App() {
  return (
    <Router>
      <div>
        <NavBar/>
        <PageIdentifierHeader/>
        <div className = "content">
        <Routes>
          <Route exact path="/" element={<Authentication />} />
          <Route exact path="/home" element={<HomeUI />} />
          <Route exact path="/stations" element={<Stations />} />
          <Route exact path="/statistics" element={<StatisticsUI />} />
          <Route exact path="/notifications" element={<NotificationsUI />} />
          <Route exact path="/help" element={<HelpUI />} />
          <Route exact path="/about-us" element={<AboutUsUI />}>
              <Route index element={<Page1 />} /> 
              <Route path="page2" element={<Page2 />} />
              <Route path="page3" element={<Page3 />} />
              <Route path="page4" element={<Page4 />} />
              <Route path="page5" element={<Page5 />} />
              <Route path="page6" element={<Page6 />} />
              <Route path="page7" element={<Page7 />} />
          </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;

