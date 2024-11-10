/**
 * @fileoverview SwipePage component provides swipe and keyboard navigation functionality
 * for a page, enabling users to navigate to the next or previous page using swipe gestures,
 * keyboard arrows, or by clicking on either side of the screen.
 * @author Meagan Eng Pei Ying, Choo Yi Ken
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css';

/**
 * SwipePage component that wraps child components and enables swipe, keypress, and click
 * navigation to switch between pages.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The child elements to render within the swipe container.
 * @param {string} props.nextPage - The path to navigate to on a right swipe, right arrow key press, or right-side click.
 * @param {string} props.prevPage - The path to navigate to on a left swipe, left arrow key press, or left-side click.
 * @returns {JSX.Element} Rendered SwipePage component with navigation functionality.
 */

const SwipePage = ({ children, nextPage, prevPage }) => {
  const [startX, setStartX] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    /**
    * Records the starting x-coordinate when a touch event starts.
    * @param {TouchEvent | MouseEvent} e - The touch or mouse event.
    */
    const handleTouchStart = (e) => {
      setStartX(e.touches ? e.touches[0].clientX : e.clientX);
    };

    /**
     * Detects end of swipe and navigates to next or previous page
     * based on swipe direction and distance.
     * @param {TouchEvent | MouseEvent} e - The touch or mouse event.
     */
    const handleTouchEnd = (e) => {
      const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      if (startX - endX > 50) {
        navigate(nextPage);
      } else if (endX - startX > 50) {
        navigate(prevPage);
      }
    };

    /**
     * Detects screen clicks and navigates based on click position.
     * @param {MouseEvent} e - The mouse click event.
     */
    const handleClick = (e) => {
      const screenWidth = window.innerWidth;
      const clickX = e.clientX;

      if (clickX > screenWidth / 2) {
        navigate(nextPage);
      } else {
        navigate(prevPage);
      }
    };

    /**
     * Detects arrow key presses to navigate between pages.
     * @param {KeyboardEvent} e - The keydown event.
     */
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        navigate(nextPage);
      } else if (e.key === 'ArrowLeft') {
        navigate(prevPage);
      }
    };

    // Add event listeners for touch, key, and click events
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('keydown', handleKeyDown);

    const container = document.querySelector('.swipe-container');
    container?.addEventListener('click', handleClick);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('keydown', handleKeyDown);
      container?.removeEventListener('click', handleClick);
    };
  }, [navigate, nextPage, prevPage]);

  return <div className="swipe-container">{children}</div>; // Render child components within the swipe container
};

export default SwipePage;


