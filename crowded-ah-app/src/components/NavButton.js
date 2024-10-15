import React from 'react';
import {Link} from 'react-router-dom';
import './NavButton.css'

const NavButton = ({label, route}) => {
    return(
        <Link to = {route}>
            <button className = 'navButton'>
                <img src = {`/images/${label}.png`} alt={label} />
                <span>{label}</span>
            </button>
        </Link>
    );
};

export default NavButton