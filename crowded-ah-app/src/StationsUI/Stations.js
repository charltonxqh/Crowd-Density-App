
import React, { useState } from 'react';
import './Stations.css';
import MRTLines from '../components/MRTLines';
import LRTLines from '../components/LRTLines';
import GoogleMap from '../components/Map';
import StationDetails from '../components/StationDetails';

const Stations = () => {
  const [view, setView] = useState('mrt'); // State to toggle between MRT and LRT views
  const [selectedLine, setSelectedLine] = useState(null);
  const [markerPositions, setMarkerPositions] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  const handleViewChange = (newView) => {
    setView(newView);
    setSelectedLine(null); // Reset selected line when changing view
    setSelectedStation(null); // Reset selected station when changing view
    setMarkerPositions([]); // Clear marker positions when changing view
  };

  const handleLineChange = (line) => {
    setSelectedLine(line);
  };

  return (
    <div className="page-container">
      <div className="MRTmap">
        <GoogleMap width="70%" markers={markerPositions} />
      </div>

      <div className="content-container">
        <div className="view-buttons">
          <button onClick={() => handleViewChange('mrt')} className={view === 'mrt' ? 'active' : ''}>MRT</button>
          <button onClick={() => handleViewChange('lrt')} className={view === 'lrt' ? 'active' : ''}>LRT</button>
        </div>
        <div className="view-content">
          {view === 'mrt' && (
            <MRTLines 
              onLineChange={handleLineChange} 
              selectedLine={selectedLine} 
              setMarkerPositions={setMarkerPositions} 
              selectedStation={selectedStation} 
              setSelectedStation={setSelectedStation} 
            />
          )}
          {view === 'lrt' && (
            <LRTLines 
              onLineChange={handleLineChange} 
              selectedLine={selectedLine} 
              setMarkerPositions={setMarkerPositions} 
              selectedStation={selectedStation} 
              setSelectedStation={setSelectedStation} 
            />
          )}
          {selectedStation && (
            <StationDetails
              station={selectedStation}
              onClose={() => setSelectedStation(null)}
            />
          )}
        </div>
      </div>
      <div className="LRTBox">
        {/* Additional content for LRT can go here */}
      </div>
    </div>
  );
};

export default Stations;
