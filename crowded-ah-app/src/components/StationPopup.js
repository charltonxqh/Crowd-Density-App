import React, { useEffect, useState } from 'react';

const StationPopup = ({ station, onClose }) => {
  const [stationData, setStationData] = useState(null);

  useEffect(() => {
    const fetchStationData = async () => {
      if (!station) return; // Prevent fetching if no station is selected
      try {
        const response = await fetch(`http://localhost:4000/api/train-arrival/${station.name}`); // Use station.code here
        const data = await response.json();
        setStationData(data);
      } catch (error) {
        console.error('Error fetching station data:', error);
      }
    };

    fetchStationData();
  }, [station]);

  if (!station) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>{station.name}</h2>
        <p>Code: {station.code}</p>
        {stationData ? (
          <div>
            <p>Arrival Time: {stationData.arrivalTime || 'N/A'}</p>
            <p>Status: {stationData.status || 'N/A'}</p>
            {/* Add more fields as necessary */}
          </div>
        ) : (
          <p>Loading data...</p>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default StationPopup;




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