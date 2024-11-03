import React, { useEffect, useState } from 'react';
import './MRTLines.css';
import { useNavigate } from 'react-router-dom';
import stationsData from '../stationsInfo.json';

export const stationLines = {
  CCL: ['Marina Bay', 'Bayfront', 'Dhoby Ghaut', 'Bras Basah', 'Esplanade', 'Promenade', 'Nicoll Highway', 'Stadium', 'Mountbatten', 'Dakota', 'Paya Lebar', 'MacPherson', 'Tai Seng', 'Bartley', 'Serangoon', 'Lorong Chuan', 'Bishan', 'Marymount', 'Caldecott', 'Botanic Gardens', 'Farrer Road', 'Holland Village', 'Buona Vista', 'one-north', 'Kent Ridge', 'Haw Par Villa', 'Pasir Panjang', 'Labrador Park', 'Telok Blangah', 'HarbourFront'],
  DTL: ['Bukit Panjang','Cashew','Hillview','Beauty World','King Albert Park','Sixth Avenue','Tan Kah Kee','Botanic Gardens','Stevens', 'Newton','Little India','Rochor','Bugis','Promenade','Bayfront','Downtown','Telok Ayer','Chinatown','Fort Canning','Bencoolen','Jalan Besar','Bendemeer','Geylang Bahru','Mattar','MacPherson','Ubi','Kaki Bukit','Bedok North','Bedok Reservoir','Tampines West','Tampines','Tampines East','Upper Changi' ,'Expo'],
  EWL: ['Changi Airport','Expo','Pasir Ris','Tampines','Simei','Tanah Merah','Bedok','Kembangan','Eunos', 'Paya Lebar','Aljunied','Kallang','Lavender','Bugis','City Hall','Raffles Place','Tanjong Pagar','Outram Park','Tiong Bahru','Redhill','Queenstown','Commonwealth','Buona Vista','Dover','Clementi','Jurong East' ,'Chinese Garden','Lakeside','Boon Lay','Pioneer' ,'Joo Koon','Gul Circle' ,'Tuas Crescent','Tuas West Road','Tuas Link'],
  NEL: ['HarbourFront','Outram Park','Chinatown','Clarke Quay','Dhoby Ghaut','Little India','Farrer Park','Boon Keng','Potong Pasir','Woodleigh','Serangoon','Kovan','Hougang','Buangkok','Sengkang','Punggol'],
  NSL: ['Jurong East','Bukit Batok','Bukit Gombak','Choa Chu Kang','Yew Tee','Kranji','Marsiling','Woodlands','Admiralty','Sembawang','Canberra','Yishun','Khatib','Yio Chu Kang','Ang Mo Kio','Bishan','Braddell','Toa Payoh','Novena','Newton','Orchard','Somerset','Dhoby Ghaut','City Hall','Raffles Place','Marina Bay','Marina South Pier'],
  TEL: ['Woodlands North','Woodlands','Woodlands South','Springleaf','Lentor','Mayflower','Bright Hill','Upper Thomson','Caldecott','Stevens','Napier','Orchard Boulevard','Orchard','Great World','Havelock','Outram Park','Maxwell','Shenton Way','Marina Bay','Gardens by the Bay','Tanjong Rhu','Katong Park','Tanjong Katong','Marine Parade','Marine Terrace','Siglap','Bayshore'],
};

const MRTLines = ({ onLineChange, selectedLine, setMarkerPositions}) => {
  const orderedLines = ['CCL', 'DTL', 'EWL', 'NEL', 'NSL', 'TEL'];

  const lineNames = {
    CCL: 'Circle Line',
    DTL: 'Downtown Line',
    EWL: 'East West Line',
    NEL: 'North East Line',
    NSL: 'North South Line',
    TEL: 'Thomson-East Coast Line',
  };

  const [openLine, setOpenLine] = useState(null);
  const [trainData, setTrainData] = useState([]);

  const mrtLines = Object.entries(stationsData).reduce((acc, [stationName, data]) => {
    const stationArray = Array.isArray(data) ? data : [data];
    stationArray.forEach(({ trainLine, stationCode, lat, lng }) => {
      if (orderedLines.includes(trainLine)) {
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
      const markerPositions = mrtLines[line].station.map(station => ({ lat: station.lat, lng: station.lng }));
      setMarkerPositions(markerPositions);
    } else {
      setMarkerPositions([]);
    }
  };

  const handleStationClick = (line,station) => {
    setMarkerPositions([{ lat: station.lat, lng: station.lng }]);
    const currentCrowdLevel = CrowdLabel(getCrowdLevel(line, station.code));
    const forecastCrowdLevel = CrowdLabel(getCrowdLevel(line, station.code, true));
    navigate(`/station/${line}-${station.code}-${encodeURIComponent(station.name)}`, {
      state: { 
        currentCrowdLevel, 
        forecastCrowdLevel 
      },
    });
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
      case 'l': return 'Low';
      case 'm': return 'Medium';
      case 'h': return 'High';
      default: return 'Unknown';
    }
  };
  return (
    <div>
      {orderedLines.map((line) => (
        mrtLines[line] && (
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
              <ul className={`mrt-station-list mrt-station-list-${line}`}>
                {mrtLines[line].station
                  .sort((a, b) => stationLines[line].indexOf(a.name) - stationLines[line].indexOf(b.name))
                  .map((station, index) => (
                    <li key={index} className="mrt-station-item">
                      <button
                        className={`mrt-station-button ${line}`}
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
                        <div className="forecast-density-container"> 
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
                          </div>
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
export default MRTLines;

