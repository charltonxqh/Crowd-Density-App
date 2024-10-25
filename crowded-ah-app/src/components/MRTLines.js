import React, { useState } from 'react';
import './MRTLines.css';

const MrtDropdown = () => {
  const mrtLines = {
    'North-South Line': ['Jurong East', 'Bukit Batok', 'Ang Mo Kio', 'Woodlands', 'Yishun'],
    'East-West Line': ['Pasir Ris', 'Tampines', 'Paya Lebar', 'Raffles Place', 'Clementi'],
    'Circle Line': ['HarbourFront', 'Buona Vista', 'Serangoon', 'Paya Lebar', 'Dhoby Ghaut'],
    'Downtown Line': ['Bukit Panjang', 'Newton', 'Little India', 'Bugis', 'Chinatown'],
  };

  const [openLine, setOpenLine] = useState(null);

  const handleToggle = (line) => {
    setOpenLine(openLine === line ? null : line); // Toggle open state
  };

  return (
    <div>
      <h2>Select MRT Stations by Line</h2>
      {Object.keys(mrtLines).map((line) => (
        <div key={line}>
          {/* Line Banner Button */}
          <button 
            onClick={() => handleToggle(line)} 
            className="mrt-line-button"
          >
            {line}
          </button>
          
          {/* Directly display list of MRT stations */}
          {openLine === line && (
            <ul className="station-list">
              {mrtLines[line].map((station, index) => (
                <li key={index} className="station-item">
                  {station}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default MrtDropdown;