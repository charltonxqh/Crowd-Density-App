/**
 * @fileoverview Displays the app logo, profile icon, and hamburger navigation menu.
 * @author Leow Yi Shian
 */

import React from 'react';
import Logo from '../components/Logo'
import Hamburger from '../components/Hamburger';
import ProfileIcon from '../components/ProfileIcon';
import { useLocation } from 'react-router-dom';
import './Header.css';

/**
 * Header component
 * 
 * It renders the app logo, profile icon, and hamburger navigation menu.
 * @component
 * @returns {JSX.Element} Rendered Header component.
 */

function Header() {
    const location = useLocation();
    const isAuthPage = location.pathname === '/';

    return (
        <div className="nav-bar">
            <Logo/>
            <div className="nav-right">
                {!isAuthPage && <ProfileIcon/> }
                {!isAuthPage && <Hamburger/> }
            </div>
        </div>
    );
}
export default Header;
