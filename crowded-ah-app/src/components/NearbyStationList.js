import React from 'react';
import './NearbyStationList.css';

const NearbyStationList = ({ stations = [] }) => {
  return (
    <div className="stations-list">
      {stations.length > 0 ? (
        <>
          <h2>MRT near you:</h2>
          <ul>
            {stations.map((station, index) => (
              <li key={index}>
                <span className="station-code">{station.name}</span>
                <div className="station-info">
                  <div className="station-name">{station.name}</div>
                  <div className="station-distance">
                    <span className="walking-icon">🚶</span>
                    <span className="time-text">2 mins</span> {/* Replace with actual time */}
                  </div>
                  <div className="station-status">
                    <span className={`status-light`}></span> Light {/* Replace with actual status */}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="no-stations-message">No stations found within the specified range.</p>
      )}
    </div>
  );
};

export default NearbyStationList;
