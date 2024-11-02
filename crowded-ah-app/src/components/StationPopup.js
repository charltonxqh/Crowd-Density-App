import React, { useEffect, useState } from 'react';
import './StationPopup.css'; 

const StationPopup = ({ station, onClose }) => {
  const [stationData, setStationData] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchStationData = async () => {
      if (!station) return; // Prevent fetching if no station is selected
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch(`http://localhost:4000/api/train-arrival/${station.name}`);
        const data = await response.json();
        setStationData(data);
      } catch (error) {
        console.error('Error fetching station data:', error);
        setStationData(null); // Reset data on error
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchStationData();
  }, [station]);

  if (!station) return null;

  // Check if we have fetched data
  const hasArrivalData = stationData && stationData.results && stationData.results.length > 0;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>{station.name}</h2>
        <p>Code: {station.code}</p>
        <button onClick={onClose}>Close</button>
        {loading ? (
          <p>Loading...</p> // Display loading message
        ) : hasArrivalData ? (
          <ul>
            {stationData.results.map((arrival, index) => (
              <li key={index}>
                {/* Display the arrival information */}
                Next Train Arrival: {arrival.next_train_arr} - Destination: {arrival.next_train_destination}
              </li>
            ))}
          </ul>
        ) : (
          <p>No arrival data available.</p>
        )}
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