import React, { useState } from 'react';
import Logo from '../components/Logo'
import Hamburger from '../components/Hamburger';
import './index.css'; // CSS for the NavBar


function NavBar() {
    return (
        <div className="NavBar">
            <Logo/>
            <Hamburger/>
        </div>
    );
}
export default NavBar;
