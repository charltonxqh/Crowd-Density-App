import React, { useEffect,useState } from 'react';
import './LRTLines.css';
import stationsData from '../stationsInfo.json';
import StationDetails from './StationDetails';

const LRTLines = ({ onLineChange, selectedLine, setMarkerPositions, selectedStation, setSelectedStation }) => {
  const validLines = ['BPL', 'SLRT', 'PLRT'];
  const orderedLines = ['BPL', 'SLRT', 'PLRT'];

  const lineNames = {
    BPL: 'Bukit-Panjang Line',
    SLRT: 'Sengkang Line',
    PLRT: 'Punggol Line',
  };

    const stationLines = {
      BPL: ['Choa Chu Kang', 'South View','Keat Hong','Teck Whye' ,'Phoenix','Bukit Panjang','Petir','Pending', 'Bangkit',,'Fajar','Segar','Jelapang','Senja'],
      SLRT: ['Cheng Lim','Farmway','Kupang','Thanggam','Fernvale','Layar' , 'Tongkang','Renjong','Sengkang','Compassvale','Rumbia','Bakau','Kangkar','Ranggung'],
      PLRT: ['Cove','Meridian','Coral Edge','Riviera','Kadaloor','Oasis','Damai','Punggol','Sam Kee' ,'Teck Lee','Punggol Point','Samudera', 'Nibong','Sumang','Soo Teck'],
    };

    const [openLine, setOpenLine] = useState(null);
    const [trainData, setTrainData] = useState([]);
    
    const lrtLines = Object.entries(stationsData).reduce((acc, [stationName, data]) => {
      const stationArray = Array.isArray(data) ? data : [data];
      stationArray.forEach(({ trainLine, stationCode, lat, lng }) => {
        if (validLines.includes(trainLine)) {
          acc[trainLine] = acc[trainLine] || { code: trainLine, station: [] };
          acc[trainLine].station.push({ code: stationCode, name: stationName, lat, lng });
        }
      });
      return acc;
    }, {});
  
    const handleToggle = (line) => {
      const isOpen = openLine === line;
      setOpenLine(prevLine => {
        const newLine = prevLine === line ? null : line;
        console.log(`Toggled line: ${newLine}`);
        return newLine;
      });
      
      if (!isOpen) {
        onLineChange(line); // Notify the parent of the selected line
        const markerPositions = lrtLines[line].station.map(station => ({ lat: station.lat, lng: station.lng }));
        setMarkerPositions(markerPositions);
      } else {
        setMarkerPositions([]); // Reset marker positions if line is closed
      }
    };
  
    const handleStationClick = (station) => {
      setMarkerPositions([{ lat: station.lat, lng: station.lng }]);
      setSelectedStation(station);
    };
  
    useEffect(() => {
      const fetchTrainData = async () => {
        try {
          const response = await fetch('http://localhost:4000/api/train-data');
          if (!response.ok) throw new Error(`Error: ${response.statusText}`);
          const data = await response.json();
          setTrainData(data);
        } catch (error) {
          console.error('Error fetching train data:', error);
        }
      };
      fetchTrainData();
    }, []);
  
    const getCrowdLevel = (line, stationCode) => {
      if (trainData[line] && trainData[line][stationCode]) {
          return trainData[line][stationCode].CrowdLevel || 'unknown';
      }
      return 'unknown';
  };
    const CrowdLabel = (level) => {
      switch (level) {
          case 'l':
              return 'Low';
          case 'm':
              return 'Medium';
          case 'h':
              return 'High';
          default:
              return 'Unknown';
      }
    };

    return (
      <div>
        {orderedLines.map((line) => (
          lrtLines[line] && (
            <div key={line}>
              <button 
                onClick={() => handleToggle(line)}
                className={`lrt-line-button ${line === selectedLine ? 'active' : ''}`}
              >
              <span className="line-code-box">
                <span className={`station-code-box-${line.toLowerCase()}`}></span>
                <span className="line-code">{line}</span>
              </span>
              {lineNames[line]}
  
              </button>
              {openLine === line && (
                  <ul className={`lrt-station-list mrt-station-list-${line.toLowerCase()}`}>
                  {lrtLines[line].station.map((station, index) => (
                    <li key={index} className="lrt-station-item">
                      <button
                        onClick={() => handleStationClick(station)}
                      >
                        <span className="station-code">{station.code}</span>
                        <span className="station-name">{station.name}</span>
                      </button> 
                      <span className="crowd-density-indicator">
                        {CrowdLabel(getCrowdLevel(lrtLines[line].code, station.code))}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        ))}
        {selectedStation && (
          <StationDetails
            station={selectedStation}
            onClose={() => setSelectedStation(null)}
          />
        )}
      </div>
    );
  };
  

export default LRTLines;
