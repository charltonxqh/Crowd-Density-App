/**
 * @fileoverview Hamburger component provides a hamburger menu with navigation buttons for different pages in the app.
 * It includes functionality for opening and closing the menu and handling clicks outside the menu to close it.
 * @author Choo Yi Ken
 */

import React, { useState, useEffect, useRef } from "react";
import NavButton from "./NavButton";
import "./Hamburger.css";

/**
 * Hamburger component that provides a menu button to toggle the visibility of the dropdown menu
 * with navigation options.
 *
 * @component
 */
function Hamburger() {
  /**
   * State to track whether the menu is open or closed.
   * @type {boolean}
   */
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Ref to handle click outside the menu for closing it.
   * @type {React.RefObject}
   */
  const dropdownRef = useRef(null);

  /**
   * Toggles the open/closed state of the hamburger menu.
   */
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  /**
   * Handles click events outside the dropdown menu to close it if clicked outside.
   * @param {Event} event - The click event
   */
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  /**
   * Sets up an event listener for clicks outside the dropdown menu to close it.
   * The listener is removed when the component is unmounted.
   */
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
