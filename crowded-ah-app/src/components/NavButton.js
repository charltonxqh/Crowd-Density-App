/**
 * @fileoverview NavButton component provides a clickable navigation button with an image and label.
 * The button navigates to a specified route when clicked.
 * @author Choo Yi Ken
 */

import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavButton.css'

/**
 * NavButton component that renders a navigation button with an image and label. 
 * The button navigates to a specified route when clicked.
 *
 * @component
 * @param {Object} props - The props for the NavButton component.
 * @param {string} props.label - The label text for the button.
 * @param {string} props.route - The route the button should navigate to when clicked.
 * @returns {JSX.Element} The rendered NavButton component.
 */
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