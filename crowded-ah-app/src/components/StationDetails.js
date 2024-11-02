import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { stationLines } from './MRTLines';
import './StationDetails.css';

const StationDetails = () => {
  const { stationId } = useParams();
  const [stationData, setStationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDirection, setSelectedDirection] = useState(null); // Store selected direction
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStationData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/train-arrival/${stationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch station data');
        }
        const data = await response.json();
        setStationData(data);
        // Extract line, code, and name
        const [line, code, name] = stationId.split('-');
        // Set the initial selected direction if available
        if (line && stationLines[line]) {
          const directions = stationLines[line];
          if (directions && directions.length > 0) {
            setSelectedDirection(directions[0]); // Set initial direction to first line
          }
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStationData();
  }, [stationId]);

  if (loading) {
    return <div className="station-details loading">Loading...</div>;
  }

  const { nextTrainETA, realTimeCrowd, forecastCrowd } = stationData || {};
  const [line, code, name] = stationId.split('-');

  return (
    <div className="station-details-container">
      <button className="back-button" onClick={() => navigate('/stations')}>← Back to Stations</button>
      <h1>{`${code} ${name}`}</h1>
      
      <div className="station-info-card">
        <h2>Station Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <label>Next Train ETA</label>
            <span>{nextTrainETA || 'N/A'}</span>
          </div>
          <div className="info-item">
            <label>Real-Time Crowd Level</label>
            <span>{realTimeCrowd || 'N/A'}</span>
          </div>
          <div className="info-item">
            <label>Forecast Crowd Level</label>
            <span>{forecastCrowd || 'N/A'}</span>
          </div>
        </div>
      </div>
      <footer className="station-footer">
      <h3>Switch Direction</h3>
          <button onClick={() => setSelectedDirection(stationLines[line][0])}>
            {stationLines[line][0]}
          </button>
          <button onClick={() => setSelectedDirection(stationLines[line][stationLines[line].length - 1])}>
            {stationLines[line][stationLines[line].length - 1]}
          </button>
          <p>Current Direction: {selectedDirection || 'Select a direction'}</p>
    </footer>
    </div>
  );
};

export default StationDetails;

// StationPopup.js
// import React from 'react';
// import './StationPopup.css';

// const StationPopup = ({ station, onClose }) => {
//   if (!station) return null;

//   return (
//     <div className="popup-overlay" onClick={onClose}>
//       <div className="popup-content" onClick={(e) => e.stopPropagation()}>
//         <h3>{station.name}</h3>
//         <p>Station Code: {station.code}</p>
//         <p>More details about the station can be shown here.</p>
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default StationPopup;