import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavButton.css'

const NavButton = ({label, route}) => {
    console.log(`Navigating to: ${route}`);
    return(
        <NavLink to = {route}>
            <button className = 'navButton'>
                <img src = {`/images/${label}.png`} alt={label} />
                <span>{label}</span>
            </button>
        </NavLink>
    );
};

export default NavButton