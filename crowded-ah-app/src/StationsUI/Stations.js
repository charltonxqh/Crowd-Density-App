// src/MRTPage.js
import React, { useState } from 'react';
import './Stations.css'; // Ensure you import your CSS file

const Stations = () => {
  const [selectedLine, setSelectedLine] = useState(null);
  const [showStations, setShowStations] = useState({}); // Track visibility of stations for each line
  const [selectedStation, setSelectedStation] = useState(null);
  const [trainETA, setTrainETA] = useState(null);
  const [crowdDensity, setCrowdDensity] = useState(null);
  const [distanceToUser, setDistanceToUser] = useState(null);

  const lines = [
    {
      name: 'Circle Line',
      shortForm: 'CC',
      color: 'yellow',
      stations: ['Dhoby Ghaut', 'Bishan', 'Circle Line 1', 'Circle Line 2'],
    },
    {
      name: 'Downtown Line',
      shortForm: 'DT',
      color: 'blue',
      stations: ['Bukit Panjang', 'Botanic Gardens', 'Bayfront'],
    },
    {
      name: 'East West Line',
      shortForm: 'EW',
      color: 'green',
      stations: ['Pasir Ris', 'Tampines', 'Bedok', 'Tanah Merah'],
    },
    {
      name: 'North East Line',
      shortForm: 'NE',
      color: 'purple',
      stations: ['HarbourFront', 'Chinatown', 'Serangoon'],
    },
    {
      name: 'North South Line',
      shortForm: 'NS',
      color: 'red',
      stations: ['Joo Koon', 'Boon Lay', 'Lakeside', 'Chinese Garden'],
    },
    {
      name: 'Thomson-East Coast Line',
      shortForm: 'TE',
      color: 'brown',
      stations: ['Woodlands', 'Woodlands South', 'TSE1', 'TSE2'],
    },
  ];

  const handleStationSelect = (station) => {
    // Replace with actual data fetching logic
    setSelectedStation(station);
    setTrainETA('5 minutes'); // Example ETA
    setCrowdDensity('Medium'); // Example density
    setDistanceToUser('2 km'); // Example distance
  };

  const toggleStationList = (lineName) => {
    setShowStations((prev) => ({
      ...prev,
      [lineName]: !prev[lineName],
    }));
  };

  return (
    <div className="mrt-page">
      <div className="map-container">
        <div id="mrt-map">Singapore MRT Map
        <img src="images/smrt-map.png" alt="Singapore MRT Map" />
        </div>
      </div>
      <div className="menu-container">
        <h2>Select MRT/LRT Line</h2>
        {lines.map((line) => (
          <div key={line.name} className="line-container">
            <div
              style={{ color: line.color, cursor: 'pointer' }}
              onClick={() => toggleStationList(line.name)}
            >
              {line.shortForm} - {line.name} <span>▼</span>
            </div>
            {showStations[line.name] && (
              <ul>
                {line.stations.map((station) => (
                  <li key={station} onClick={() => handleStationSelect(station)}>
                    {station}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {selectedStation && (
          <div className="station-info">
            <h3>Selected Station: {selectedStation}</h3>
            <p>Next Train ETA: {trainETA}</p>
            <p>Crowd Density: {crowdDensity}</p>
            <p>Distance to You: {distanceToUser}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stations;