import React from 'react';
//import './styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Page1, Page2, Page3, Page4 } from './About_us_pages';

const AboutUsUI = () => {
    return (
            <Routes>
                <Route path="/" element={<Page1 />} />
                <Route path="/page2" element={<Page2 />} />
                <Route path="/page3" element={<Page3/>} />
                <Route path="/page4" element={<Page4/>} />
            </Routes>
    );
}


export default AboutUsUI