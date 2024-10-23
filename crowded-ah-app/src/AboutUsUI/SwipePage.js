import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './About_us_styles.css';

const SwipePage = ({ children, nextPage, prevPage }) => {
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Handle both touch and mouse events
    const handleTouchStart = (e) => {
      setStartX(e.touches ? e.touches[0].clientX : e.clientX);
    };

    const handleTouchMove = (e) => {
      setEndX(e.touches ? e.touches[0].clientX : e.clientX);
    };

    const handleTouchEnd = () => {
        if (startX - endX > 50) {
            navigate(nextPage);  // Ensure that nextPage points to '/about-us/page2', etc.
        } else if (endX - startX > 50) {
            navigate(prevPage);  // Ensure that prevPage points to '/about-us/page4', etc.
        }
    };

    // Mouse event handlers for desktop
    const handleMouseDown = (e) => {
      setStartX(e.clientX);
    };

    const handleMouseUp = (e) => {
      setEndX(e.clientX);
      handleTouchEnd(); // Call the same logic as touch end
    };

    // Add event listeners for touch and mouse
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      // Cleanup listeners
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [startX, endX, navigate, nextPage, prevPage]);

  return <div className="swipe-container">{children}</div>;
};

export default SwipePage;

