// StationPopup.js
import React from 'react';
import './StationPopup.css';

const StationPopup = ({ station, onClose }) => {
  if (!station) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3>{station.name}</h3>
        <p>Station Code: {station.code}</p>
        <p>More details about the station can be shown here.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default StationPopup;
