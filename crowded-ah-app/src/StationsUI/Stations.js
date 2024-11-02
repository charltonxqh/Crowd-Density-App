// import React, { useState } from 'react';
// import './Stations.css';
// import MRTLines from '../components/MRTLines';
// import LRTLines from '../components/LRTLines';
// import Map from '../components/MRTApp';
// import stationsData from '../stationsInfo.json';

// const App = () => {
//   const [view, setView] = useState('mrt'); // Track MRT or LRT view
//   const [selectedLine, setSelectedLine] = useState(null); // Track selected line
//   const [stations, setStations] = useState([]); // Track station markers for the map
//   const [markers, setMarkers] = useState([]);

//   const handleLineChange = (lineCode) => {
//     const selectedLineData = stationsData[lineCode]?.station || [];
    
//     const lineStations = selectedLineData
//       .map((station) => ({
//         name: station.name,
//         lat: stationsData[station.code]?.lat,
//         lng: stationsData[station.code]?.lng,
//       }))
//       .filter((station) => station.lat && station.lng);

//     setStations(lineStations); 
//     console.log("Stations for selected line:", lineStations);
//     setSelectedLine(lineCode); // Update selected line
//   };

//   const handleViewChange = (newView) => {
//     setView(newView);
//     setMarkers([]); 
//     setSelectedLine(null); 
//   };

//   return (
//     <div className="page-container">
//       <div className="MRTmap">
//         {/* Pass stations as a prop to GoogleMap */}
//         <Map width="90%" stations={stations} />
//       </div>

//       <div className="content-container">
//         <div className="view-buttons">
//           <button onClick={() => handleViewChange('mrt')} className={view === 'mrt' ? 'active' : ''}>MRT</button>
//           <button onClick={() => handleViewChange('lrt')} className={view === 'lrt' ? 'active' : ''}>LRT</button>
//         </div>
//         <div className="view-content">
//           {view === 'lrt' && <LRTLines />}
//           {view === 'mrt' && (
//             <MRTLines onLineChange={handleLineChange} selectedLine={selectedLine} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
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





































// const Stations = () => {
//   const [selectedLine, setSelectedLine] = useState(null);
//   const [showStations, setShowStations] = useState({}); // Track visibility of stations for each line
//   const [selectedStation, setSelectedStation] = useState(null);
//   const [trainETA, setTrainETA] = useState(null);
//   const [crowdDensity, setCrowdDensity] = useState(null);
//   const [distanceToUser, setDistanceToUser] = useState(null);

//   const lines = [
//     {
//       name: 'Circle Line',
//       shortForm: 'CC',
//       color: 'yellow',
//       stations: ['Dhoby Ghaut', 'Bishan', 'Circle Line 1', 'Circle Line 2'],
//     },
//     {
//       name: 'Downtown Line',
//       shortForm: 'DT',
//       color: 'blue',
//       stations: ['Bukit Panjang', 'Botanic Gardens', 'Bayfront'],
//     },
//     {
//       name: 'East West Line',
//       shortForm: 'EW',
//       color: 'green',
//       stations: ['Pasir Ris', 'Tampines', 'Bedok', 'Tanah Merah'],
//     },
//     {
//       name: 'North East Line',
//       shortForm: 'NE',
//       color: 'purple',
//       stations: ['HarbourFront', 'Chinatown', 'Serangoon'],
//     },
//     {
//       name: 'North South Line',
//       shortForm: 'NS',
//       color: 'red',
//       stations: ['Joo Koon', 'Boon Lay', 'Lakeside', 'Chinese Garden'],
//     },
//     {
//       name: 'Thomson-East Coast Line',
//       shortForm: 'TE',
//       color: 'brown',
//       stations: ['Woodlands', 'Woodlands South', 'TSE1', 'TSE2'],
//     },
//   ];

//   const handleStationSelect = (station) => {
//     // Replace with actual data fetching logic
//     setSelectedStation(station);
//     setTrainETA('5 minutes'); // Example ETA
//     setCrowdDensity('Medium'); // Example density
//     setDistanceToUser('2 km'); // Example distance
//   };

//   const toggleStationList = (lineName) => {
//     setShowStations((prev) => ({
//       ...prev,
//       [lineName]: !prev[lineName],
//     }));
//   };

//   return (
//     <div className="mrt-page">
//       <div className="map-container">
//         <div id="mrt-map">Singapore MRT Map
//         <img src="images/smrt-map.png" alt="Singapore MRT Map" />
//         </div>
//       </div>
//       <div className="menu-container">
//         <h2>Select MRT/LRT Line</h2>
//         {lines.map((line) => (
//           <div key={line.name} className="line-container">
//             <div
//               style={{ color: line.color, cursor: 'pointer' }}
//               onClick={() => toggleStationList(line.name)}
//             >
//               {line.shortForm} - {line.name} <span>▼</span>
//             </div>
//             {showStations[line.name] && (
//               <ul>
//                 {line.stations.map((station) => (
//                   <li key={station} onClick={() => handleStationSelect(station)}>
//                     {station}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         ))}
//         {selectedStation && (
//           <div className="station-info">
//             <h3>Selected Station: {selectedStation}</h3>
//             <p>Next Train ETA: {trainETA}</p>
//             <p>Crowd Density: {crowdDensity}</p>
//             <p>Distance to You: {distanceToUser}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Stations;