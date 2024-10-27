import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css';

const SwipePage = ({ children, nextPage, prevPage }) => {
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Handle touch start for swipe detection
    const handleTouchStart = (e) => {
      setStartX(e.touches ? e.touches[0].clientX : e.clientX);
    };

    // Handle touch move for swipe detection
    const handleTouchMove = (e) => {
      setEndX(e.touches ? e.touches[0].clientX : e.clientX);
    };

    // Handle touch end to determine swipe direction
    const handleTouchEnd = () => {
      if (startX - endX > 50) {
        navigate(nextPage); // Swiped left, navigate to next page
      } else if (endX - startX > 50) {
        navigate(prevPage); // Swiped right, navigate to previous page
      }
    };

    // Handle click to navigate based on which half of the screen was clicked
    const handleClick = (e) => {
      const screenWidth = window.innerWidth;
      const clickX = e.clientX;

      if (clickX > screenWidth / 2) {
        navigate(nextPage); // Right half clicked, navigate to next page
      } else {
        navigate(prevPage); // Left half clicked, navigate to previous page
      }
    };

    // Handle keydown for left and right arrow keys
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        navigate(nextPage); // Right arrow key pressed, navigate to next page
      } else if (e.key === 'ArrowLeft') {
        navigate(prevPage); // Left arrow key pressed, navigate to previous page
      }
    };

    // Add event listeners for touch, click, and keydown events
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup all listeners on component unmount
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [startX, endX, navigate, nextPage, prevPage]);

  return <div className="swipe-container">{children}</div>;
};

export default SwipePage;


