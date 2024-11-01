import React from 'react';
import './NearbyStationList.css';

const NearbyStationList = ({ stations = [] }) => {
  return (
    <div className="Stations-list">
      {stations.length > 0 ? (
        <>
          <h2>MRT near you:</h2>
          <ul>
            {stations.map((station, index) => (
              <li key={index} className="Station-item">
                <span className="Station-code">{station.name}</span>
                <div className="Station-info">
                  <div className="Station-name">{station.name}</div>
                  <div className="Station-distance">
                    <span className="walking-icon">🚶</span>
                    <span className="distance-text">{station.distance}</span> {/* Replace with actual time */}
                  </div>
                  <div className="Station-status">
                    <span className={`Status-light`}></span> Light {/* Replace with actual status */}
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