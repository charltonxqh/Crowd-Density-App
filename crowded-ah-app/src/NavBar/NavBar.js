import React from 'react';
import Logo from '../components/Logo'
import Hamburger from '../components/Hamburger';
import './NavBar.css';
import ProfileIcon from '../components/ProfileIcon';
import { useLocation } from 'react-router-dom';

function NavBar() {
    const location = useLocation();
    
    // Check if the current path is the authentication page
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
export default NavBar;
