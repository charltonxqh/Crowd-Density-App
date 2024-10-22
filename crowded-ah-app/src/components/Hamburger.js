import React, { useState, useEffect, useRef } from 'react';
import NavButton from './NavButton';
import './Hamburger.css';

function Hamburger() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null); // Create a ref for the dropdown menu

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    // Close the dropdown menu when clicking outside
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        // Add event listener to close menu on outside click
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Cleanup the event listener on component unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="hamburgerContainer" ref={dropdownRef}>
            <button className="hamburger" onClick={toggleMenu}>
                <img src="/images/hamburger.png" alt="Menu" />
            </button>
            {isOpen && (
                <div className="dropDownMenu">
                    <NavButton label="Home" route="/" />
                    <NavButton label="Stations" route="/stations" />
                    <NavButton label="Statistics" route="/statistics" />
                    <NavButton label="Notifications" route="/notifications" />
                    <NavButton label="Help" route="/help" />
                    <NavButton label="AboutUs" route="/about-us" />
                </div>
            )}
        </div>
    );
}

export default Hamburger;
