import React from 'react';
import Logo from '../components/Logo'
import Hamburger from '../components/Hamburger';
import './styles.css';
import ProfileIcon from '../components/ProfileIcon';
import { useLocation } from 'react-router-dom';

function NavBar() {
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
export default NavBar;
