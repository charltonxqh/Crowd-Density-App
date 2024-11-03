import React, { useEffect,useState } from 'react';
import stationsData from '../stationsInfo.json';
import './LRTLines.css';
import { useNavigate } from 'react-router-dom';

const LRTLines = ({ onLineChange, selectedLine, setMarkerPositions}) => {
  const validLines = ['BPL', 'SLRT', 'PLRT'];
  const orderedLines = ['BPL', 'SLRT', 'PLRT'];

  const lineNames = {
    BPL: 'Bukit-Panjang Line',
    SLRT: 'Sengkang Line',
    PLRT: 'Punggol Line',
  };

    const stationLines = {
      BPL: ['Choa Chu Kang', 'South View','Keat Hong','Teck Whye' ,'Pheonix','Bukit Panjang','Petir','Pending', 'Bangkit','Fajar','Segar','Jelapang','Senja'],
      SLRT: ['Cheng Lim','Farmway','Kupang','Thanggam','Fernvale','Layar' , 'Tongkang','Renjong','Sengkang','Compassvale','Rumbia','Bakau','Kangkar','Ranggung'],
      PLRT: ['Cove','Meridian','Coral Edge','Riviera','Kadaloor','Oasis','Damai','Punggol','Sam Kee' ,'Teck Lee','Punggol Point','Samudera', 'Nibong','Sumang','Soo Teck'],
    };

    const [openLine, setOpenLine] = useState(null);
    const [trainData, setTrainData] = useState([]);
    const [arrivalData, setArrivalData] = useState(null);
    
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
        onLineChange(line); 
        const markerPositions = lrtLines[line].station.map(station => ({ lat: station.lat, lng: station.lng }));
        setMarkerPositions(markerPositions);
      } else {
        setMarkerPositions([]); 
      }
    };
  
    const handleStationClick = (line,station) => {
      setMarkerPositions([{ lat: station.lat, lng: station.lng }]);
      navigate(`/station/${line}-${station.code}-${encodeURIComponent(station.name)}`);
    };
    
    const navigate = useNavigate();

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
  
    const getCrowdLevel = (line, stationCode, isForecast=false) => {
      const type = isForecast ? 'forecast' : 'realTime';
      if (
        trainData &&
        trainData[type] &&
        trainData[type][line] &&
        trainData[type][line][stationCode]
      ) {
        return trainData[type][line][stationCode].CrowdLevel || 'unknown';
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
              className={`mrt-line-button ${line === selectedLine ? 'active' : ''}`}
            >
              <span className={`line-code-box ${line}`}>
                <span className="line-code">{line}</span>
              </span>
              {lineNames[line]}
            </button>
            {openLine === line && (
              <ul className={`lrt-station-list lrt-station-list-${line}`}>
                {lrtLines[line].station
                  .sort((a, b) => stationLines[line].indexOf(a.name) - stationLines[line].indexOf(b.name))
                  .map((station, index) => (
                    <li key={index} className="lrt-station-item">
                      <button
                        className={`lrt-station-button ${line}`}
                        onClick={() => handleStationClick(line,station)}
                      >
                        <span className="station_code">{station.code} | </span>
                        <span className="station_name">{station.name}</span>
                      </button>
                      <div className="crowd-density">
                        <div className="now-density-container"> 
                            <span>Now:</span>
                            <div className="now-crowd-density-box">
                                <div className="crowd-level-indicator">
                                    <div className={`crowd-level-color ${getCrowdLevel(line, station.code)}`}></div>
                                    <div className="crowd-level-label">
                                        {CrowdLabel(getCrowdLevel(line, station.code))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="forecast-density-container"> 
                          <span>Forecast:</span>
                            <div className="forecast-crowd-density-box">
                              <div className="crowd-level-indicator">
                                <div className={`crowd-level-color ${getCrowdLevel(line, station.code, true)}`}>
                                </div>
                                <div className="crowd-level-label">
                                  {CrowdLabel(getCrowdLevel(line, station.code, true))}
                                </div>
                              </div>
                          </div>
                          </div> */}
                        </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        )
      ))}
    </div>
  );
};
export default LRTLines;
