import React, { useEffect,useState } from 'react';
import StationPopup from './StationPopup';
import './LRTLines.css';

const LRTLines = () => {
    const lrtLines = {
        'Bukit-Panjang Line': { code: 'BPL', stations: [{ code: 'BP1', name: 'Choa Chu Kang' }, { code: 'BP2', name: 'South View' }, { code: 'BP3', name: 'Keat Hong' }, { code: 'BP4', name: 'Teck Whye' }, { code: 'BP5', name: 'Phoenix' }, { code: 'BP6', name: 'Bukit Panjang' }, { code: 'BP7', name: 'Petir' }, { code: 'BP8', name: 'Pending' }, { code: 'BP9', name: 'Bangkit' }, { code: 'BP10', name: 'Fajar' }, { code: 'BP11', name: 'Segar' }, { code: 'BP12', name: 'Jelapang' }, { code: 'BP13', name: 'Senja' }] },
        'Sengkang Line': { code: 'SLRT', stations: [{ code: 'SW1', name: 'Cheng Lim' }, { code: 'SW2', name: 'Farmway' }, { code: 'SW3', name: 'Kupang' }, { code: 'SW4', name: 'Thanggam' }, { code: 'SW5', name: 'Fernvale' }, { code: 'SW6', name: 'Layar' }, { code: 'SW7', name: 'Tongkang' }, { code: 'SW8', name: 'Renjong' }, { code: 'STC', name: 'Sengkang' }, { code: 'SE1', name: 'Compassvale' }, { code: 'SE2', name: 'Rumbia' }, { code: 'SE3', name: 'Bakau' }, { code: 'SE4', name: 'Kangkar' }, { code: 'SE5', name: 'Ranggung' }] },
        'Punggol Line': { code: 'PLRT', stations: [{ code: 'PE1', name: 'Cove' }, { code: 'PE2', name: 'Meridian' }, { code: 'PE3', name: 'Coral Edge' }, { code: 'PE4', name: 'Riviera' }, { code: 'PE5', name: 'Kadaloor' }, { code: 'PE6', name: 'Oasis' }, { code: 'PE7', name: 'Damai' }, { code: 'PTC', name: 'Punggol' }, { code: 'PW1', name: 'Sam Kee' }, { code: 'PW2', name: 'Teck Lee' }, { code: 'PW3', name: 'Punggol Point' }, { code: 'PW4', name: 'Samudera' }, { code: 'PW5', name: 'Nibong' }, { code: 'PW6', name: 'Sumang' }, { code: 'PW7', name: 'Soo Teck' }] },
    };

    const lineClasses = {
        'Bukit-Panjang Line': { buttonClass: 'bukit-panjang-line', dropdownClass: 'bukit-panjang-line-dropdown', itemClass: 'bukit-panjang-line-items' },
        'Sengkang Line': { buttonClass: 'sengkang-line', dropdownClass: 'sengkang-line-dropdown', itemClass: 'sengkang-line-items' },
        'Punggol Line': { buttonClass: 'punggol-line', dropdownClass: 'punggol-line-dropdown', itemClass: 'punggol-line-items' },
    };

    const [openLine, setOpenLine] = useState(null);
    const [selectedStation, setSelectedStation] = useState(null);
  
    const handleToggle = (line) => {
      setOpenLine(openLine === line ? null : line);
    };
  
    const handleStationClick = (station) => {
      setSelectedStation(station);
    };
  
    const handleClosePopup = () => {
      setSelectedStation(null);
    };
    const [trainData, setTrainData] = useState([]);
  
    async function getTrainData() {
      try {
        const response = await fetch('http://localhost:4000/api/train-data');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched train data:', data); 
        setTrainData(data);
      } catch (error) {
        console.error('Error fetching train data:', error);
      }
    }
  
    useEffect(() => {
      getTrainData();
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
            {Object.keys(lrtLines).map((line) => (
                <div key={line}>
                    {/* Line Banner Button with Line Code */}
                    <button
                        onClick={() => handleToggle(line)}
                        className={`lrt-line-button ${lineClasses[line].buttonClass}`}
                    >
                        <span className="line-code-box">
                            <span className="line-code">{lrtLines[line].code}</span>
                        </span> 
                        {line}
                    </button>

                    {/* Directly display list of MRT stations */}
                    {openLine === line && (
                        <ul className={`lrt-station-list ${lineClasses[line].dropdownClass}`}>
                            {lrtLines[line].stations.map((station, index) => (
                                <li key={index} className={`lrt-station-item ${lineClasses[line].itemClass}`}>
                                <button
                                key={station.code}
                                className={`station-code-box-${line.toLowerCase().replace(/\s+/g, '-')}`}
                                onClick={() => handleStationClick(station)}>
                                <span className="station-code">{station.code}</span>
                                <span className="station-name">{station.name}</span>
                                </button> 
                                <span
                                className={`crowd-density-indicator ${getCrowdLevel(lrtLines[line].code, station.code)}`}
                                title={getCrowdLevel(lrtLines[line].code, station.code)}
                                >{CrowdLabel(getCrowdLevel(lrtLines[line].code, station.code))}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
                {selectedStation && (
            <StationPopup
            station={selectedStation}
            onClose={handleClosePopup}
            />
        )}
        </div>
    );
};

export default LRTLines;

