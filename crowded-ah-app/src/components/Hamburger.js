import React, { useState, useEffect, useRef } from 'react';
import NavButton from './NavButton';
import './Hamburger.css';

function Hamburger() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
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
                    <NavButton label="Home" route="/home" />
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
