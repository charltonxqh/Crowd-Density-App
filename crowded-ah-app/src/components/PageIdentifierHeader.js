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
    const currentPath = location.pathname;

    const currentPageTitleKey = Object.keys(pageTitles).find(key => 
        currentPath === key || currentPath.startsWith(key + '/')
    );

    const currentPageTitle = currentPageTitleKey ? pageTitles[currentPageTitleKey] : 'Home';

    return (
        <div className="header-banner">
            <h2>{currentPageTitle}</h2>           
        </div>
    );
};

export default PageIdentifierHeader;
