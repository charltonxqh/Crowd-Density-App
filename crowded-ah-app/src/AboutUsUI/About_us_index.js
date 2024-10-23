import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Page1, Page2, Page3, Page4 } from './About_us_pages';

const AboutUsUI = () => {
    return (
        <div className="AboutUsUI">
          <Routes>
            {/* Define routes for About Us pages */}
            <Route path="/" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/page3" element={<Page3 />} />
            <Route path="/page4" element={<Page4 />} />
    
            {/* Redirect any unmatched routes to the first page */}
            <Route path="*" element={<Navigate to="/about-us" />} />
          </Routes>
        </div>
      );
};

export default AboutUsUI;
