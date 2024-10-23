import React from 'react';
import { useLocation } from 'react-router-dom';
import './PageIdentifierHeader.css'; 


const pageTitles = {
    '/': 'Home',
    '/stations': 'Stations',
    '/statistics': 'Statistics',
    '/notifications': 'Notifications',
    '/help': 'Help',
    '/about-us': 'About Us'
};

const PageIdentifierHeader = () => {
    const location = useLocation();
    const currentPageTitle = pageTitles[location.pathname];
    return (
        <div className="header-banner">
            <h2>{currentPageTitle}</h2>
            
        </div>
    );
};

export default PageIdentifierHeader;