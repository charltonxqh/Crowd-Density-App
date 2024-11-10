/**
 * @fileoverview The Stations component renders a page that allows users to toggle 
 * between MRT and LRT views, select lines, and view Google Map markers of selected stations.
 * It dynamically updates the map markers and displays details of a selected station.
 * @author Meagan Eng Pei Ying, Liaw Rui Xian
 */

import React, { useState } from 'react';
import './Stations.css';
import MRTLines from '../components/MRTLines';
import LRTLines from '../components/LRTLines';
import GoogleMap from '../components/Map';
import StationDetails from '../components/StationDetails';

/**
 * Stations component for displaying and interacting with MRT and LRT lines and stations.
 * It includes a Google Map, line selection buttons, and station details pop-up.
 *
 * @component
 * @returns {JSX.Element} Rendered Stations component with line selection and map functionality.
 */

const Stations = () => {
  const [view, setView] = useState('mrt');
  const [selectedLine, setSelectedLine] = useState(null);
  const [markerPositions, setMarkerPositions] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  /**
   * Handles changing the view between MRT and LRT.
   * Resets line and station selection and marker positions when view changes.
   * @param {string} newView - 'mrt' or 'lrt' to indicate the selected view.
   */
  const handleViewChange = (newView) => {
    setView(newView);
    setSelectedLine(null); 
    setSelectedStation(null); 
    setMarkerPositions([]);
  };

  /**
   * Handles changing the selected line, triggering updates in the map markers.
   * @param {string} line - The line selected by the user.
   */
  const handleLineChange = (line) => {
    setSelectedLine(line);
  };

  // Determines which line component (MRTLines or LRTLines) to render based on the selected view
  const LineComponent = view === 'mrt' ? MRTLines : LRTLines;

  return (
    <div className="page-container-stations">
      <div className="MRTmap">
        <GoogleMap width="70%" markers={markerPositions} />
      </div>

      <div className="content-container">
        <div className="view-buttons">
          <button onClick={() => handleViewChange('mrt')} className={view === 'mrt' ? 'active' : ''}>MRT</button>
          <button onClick={() => handleViewChange('lrt')} className={view === 'lrt' ? 'active' : ''}>LRT</button>
        </div>

        {/* Conditionally render either MRTLines or LRTLines based on view selection */}
        <div className="view-content">
        <LineComponent 
          onLineChange={handleLineChange} 
          selectedLine={selectedLine} 
          setMarkerPositions={setMarkerPositions} 
          selectedStation={selectedStation} 
          setSelectedStation={setSelectedStation} 
        />
          {selectedStation && (
            <StationDetails
              station={selectedStation}
              onClose={() => setSelectedStation(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Stations;

