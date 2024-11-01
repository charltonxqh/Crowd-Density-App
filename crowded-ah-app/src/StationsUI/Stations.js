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
import StationPopup from '../components/StationPopup';

const App = () => {
  const [view, setView] = useState('mrt');
  const [selectedLine, setSelectedLine] = useState(null); // Track the selected line
  const [markerPositions, setMarkerPositions] = useState([]); // Track marker positions
  const [selectedStation, setSelectedStation] = useState(null); // Track selected station

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleLineChange = (line) => {
    setSelectedLine(line); // Update the selected line
    console.log('Selected Line:', line); // Optional: Log the selected line
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
          {selectedStation && (
            <StationPopup
              station={selectedStation}
              onClose={() => setSelectedStation(null)}
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
            <StationPopup
              station={selectedStation}
              onClose={() => setSelectedStation(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;




































