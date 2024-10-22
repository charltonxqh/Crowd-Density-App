import React from 'react';
import Logo from '../components/Logo'
import Hamburger from '../components/Hamburger';
import './NavBar.css'; 


function NavBar() {
    return (
        <div className="nav-bar">
            <Logo/>
            <Hamburger/>
        </div>
    );
}
export default NavBar;
