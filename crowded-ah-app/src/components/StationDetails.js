import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StationDetails = () => {
  const { stationId } = useParams();
  const [stationData, setStationData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStationData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/train-arrival/${stationId}`);
        const data = await response.json();
        setStationData(data);
      } catch (error) {
        console.error('Error fetching station data:', error);
      }
    };

    // Fetch data each time stationId changes
    fetchStationData();
  }, [stationId]);

  return (
    <div className="station-details">
      <button onClick={() => navigate('/')}>Back to Stations</button> {/* Back navigation */}
      
      <h2>{stationData?.name || 'Loading...'}</h2>
      <p>Code: {stationData?.code || 'Loading...'}</p>
      <p>Arrival Time: {stationData?.arrivalTime || 'N/A'}</p>
      <p>Status: {stationData?.status || 'N/A'}</p>
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