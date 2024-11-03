import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css';

const SwipePage = ({ children, nextPage, prevPage }) => {
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleTouchStart = (e) => {
      setStartX(e.touches ? e.touches[0].clientX : e.clientX);
    };

    const handleTouchMove = (e) => {
      setEndX(e.touches ? e.touches[0].clientX : e.clientX);
    };

    const handleTouchEnd = () => {
      if (startX - endX > 50) {
        navigate(nextPage);
      } else if (endX - startX > 50) {
        navigate(prevPage);
      }
      setStartX(0);
      setEndX(0);
    };

    const handleClick = (e) => {
      const screenWidth = window.innerWidth;
      const clickX = e.clientX;

      if (clickX > screenWidth / 2) {
        navigate(nextPage);
      } else {
        navigate(prevPage);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        navigate(nextPage);
      } else if (e.key === 'ArrowLeft') {
        navigate(prevPage);
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('keydown', handleKeyDown);

    const container = document.querySelector('.swipe-container');
    container?.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('keydown', handleKeyDown);
      container?.removeEventListener('click', handleClick);
    };
  }, [startX, endX, navigate, nextPage, prevPage]);

  return <div className="swipe-container">{children}</div>;
};

export default SwipePage;


