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
  const [arrivalData, setArrivalData] = useState(null); // State to hold arrival data

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
                        <span>Now:</span>
                        <div className="crowd-density-box">
                            <div className={`crowd-level-indicator ${getCrowdLevel(line, station.code)}`}>
                              {CrowdLabel(getCrowdLevel(line, station.code))}
                            </div>
                        </div>
                        <span>Forecast:</span>
                        <div className="crowd-density-box">
                          <div className={`crowd-level-indicator ${getCrowdLevel(line, station.code, true)}`}>
                          {CrowdLabel(getCrowdLevel(line, station.code, true))}
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

// import React, { useEffect,useState } from 'react';
// import StationPopup from './StationPopup';
// import './MRTLines.css';

// const MRTLines = () => {

//   const mrtLines = {
//     'Circle Line': {code: 'CCL',station: [{ code: 'CE2', name: 'Marina Bay' }, { code: 'CE1', name: 'Bayfront' }, { code: 'CC1', name: 'Dhoby Ghaut' },  { code: 'CC2', name: 'Bras Basah' },  { code: 'CC3', name: 'Esplanade' },  { code: 'CC4', name: 'Promenade' },  { code: 'CC5', name: 'Nicoll Highway' },  { code: 'CC6', name: 'Stadium' },  { code: 'CC7', name: 'Mountbatten' },  { code: 'CC8', name: 'Dakota' },  { code: 'CC9', name: 'Paya Lebar' },  { code: 'CC10', name: 'MacPherson' },  { code: 'CC11', name: 'Tai Seng' },  { code: 'CC12', name: 'Bartley' },  { code: 'CC13', name: 'Serangoon' },  { code: 'CC14', name: 'Lorong Chuan' },  { code: 'CC15', name: 'Bishan' },  { code: 'CC16', name: 'Marymount' },  { code: 'CC17', name: 'Caldecott' },  { code: 'CC19', name: 'Botanic Gardens' },  { code: 'CC20', name: 'Farrer Road' },  { code: 'CC21', name: 'Holland Village' },  { code: 'CC22', name: 'Buona Vista' },  { code: 'CC23', name: 'one-north' },  { code: 'CC24', name: 'Kent Ridge' },  { code: 'CC25', name: 'Haw Par Villa' },  { code: 'CC26', name: 'Pasir Panjang' },  { code: 'CC27', name: 'Labrador Park' },  { code: 'CC28', name: 'Telok Blangah' },  { code: 'CC29', name: 'HarbourFront' },] },
//     'Downtown Line': {code: 'DTL',station: [{ code: 'DT1', name: 'Bukit Panjang' }, { code: 'DT2', name: 'Cashew' }, { code: 'DT3', name: 'Hillview' }, { code: 'DT5', name: 'Beauty World' }, { code: 'DT6', name: 'King Albert Park' }, { code: 'DT7', name: 'Sixth Avenue' }, { code: 'DT8', name: 'Tan Kah Kee' }, { code: 'DT9', name: 'Botanic Gardens' }, { code: 'DT10', name: 'Stevens' }, { code: 'DT11', name: 'Newton' }, { code: 'DT12', name: 'Little India' }, { code: 'DT13', name: 'Rochor' }, { code: 'DT14', name: 'Bugis' }, { code: 'DT15', name: 'Promenade' }, { code: 'DT16', name: 'Bayfront' }, { code: 'DT17', name: 'Downtown' }, { code: 'DT18', name: 'Telok Ayer' }, { code: 'DT19', name: 'Chinatown' }, { code: 'DT20', name: 'Fort Canning' }, { code: 'DT21', name: 'Bencoolen' }, { code: 'DT22', name: 'Jalan Besar' }, { code: 'DT23', name: 'Bendemeer' }, { code: 'DT24', name: 'Geylang Bahru' }, { code: 'DT25', name: 'Mattar' }, { code: 'DT26', name: 'MacPherson' }, { code: 'DT27', name: 'Ubi' }, { code: 'DT28', name: 'Kaki Bukit' }, { code: 'DT29', name: 'Bedok North' }, { code: 'DT30', name: 'Bedok Reservoir' }, { code: 'DT31', name: 'Tampines West' }, { code: 'DT32', name: 'Tampines' }, { code: 'DT33', name: 'Tampines East' }, { code: 'DT34', name: 'Upper Changi' }, { code: 'DT35', name: 'Expo'}]},
//     'East-West Line': {code: 'EWL', station: [{ code: 'CG2', name: 'Changi Airport' }, { code: 'CG1', name: 'Expo' }, { code: 'EW1', name: 'Pasir Ris' }, { code: 'EW2', name: 'Tampines' }, { code: 'EW3', name: 'Simei' }, { code: 'EW4', name: 'Tanah Merah' }, { code: 'EW5', name: 'Bedok' }, { code: 'EW6', name: 'Kembangan' }, { code: 'EW7', name: 'Eunos' }, { code: 'EW8', name: 'Paya Lebar' }, { code: 'EW9', name: 'Aljunied' }, { code: 'EW10', name: 'Kallang' }, { code: 'EW11', name: 'Lavender' }, { code: 'EW12', name: 'Bugis' }, { code: 'EW13', name: 'City Hall' }, { code: 'EW14', name: 'Raffles Place' }, { code: 'EW15', name: 'Tanjong Pagar' }, { code: 'EW16', name: 'Outram Park' }, { code: 'EW17', name: 'Tiong Bahru' }, { code: 'EW18', name: 'Redhill' }, { code: 'EW19', name: 'Queenstown' }, { code: 'EW20', name: 'Commonwealth' }, { code: 'EW21', name: 'Buona Vista' }, { code: 'EW22', name: 'Dover' }, { code: 'EW23', name: 'Clementi' }, { code: 'EW24', name: 'Jurong East' }, { code: 'EW25', name: 'Chinese Garden' }, { code: 'EW26', name: 'Lakeside' }, { code: 'EW27', name: 'Boon Lay' }, { code: 'EW28', name: 'Pioneer' }, { code: 'EW29', name: 'Joo Koon' }, { code: 'EW30', name: 'Gul Circle' }, { code: 'EW31', name: 'Tuas Crescent' }, { code: 'EW32', name: 'Tuas West Road' }, { code: 'EW33', name: 'Tuas Link'}]},
//     'North East Line': {code: 'NEL', station: [{ code: 'NE1', name: 'HarbourFront' }, { code: 'NE3', name: 'Outram Park' }, { code: 'NE4', name: 'Chinatown' }, { code: 'NE5', name: 'Clarke Quay' }, { code: 'NE6', name: 'Dhoby Ghaut' }, { code: 'NE7', name: 'Little India' }, { code: 'NE8', name: 'Farrer Park' }, { code: 'NE9', name: 'Boon Keng' }, { code: 'NE10', name: 'Potong Pasir' }, { code: 'NE11', name: 'Woodleigh' }, { code: 'NE12', name: 'Serangoon' }, { code: 'NE13', name: 'Kovan' }, { code: 'NE14', name: 'Hougang' }, { code: 'NE15', name: 'Buangkok' }, { code: 'NE16', name: 'Sengkang' }, { code: 'NE17', name: 'Punggol' }]},
//     'North-South Line': {code: 'NSL', station: [{ code: 'NS1', name: 'Jurong East' }, { code: 'NS2', name: 'Bukit Batok' }, { code: 'NS3', name: 'Bukit Gombak' }, { code: 'NS4', name: 'Choa Chu Kang' }, { code: 'NS5', name: 'Yew Tee' }, { code: 'NS7', name: 'Kranji' }, { code: 'NS8', name: 'Marsiling' }, { code: 'NS9', name: 'Woodlands' }, { code: 'NS10', name: 'Admiralty' }, { code: 'NS11', name: 'Sembawang' }, { code: 'NS12', name: 'Canberra' }, { code: 'NS13', name: 'Yishun' }, { code: 'NS14', name: 'Khatib' }, { code: 'NS15', name: 'Yio Chu Kang' }, { code: 'NS16', name: 'Ang Mo Kio' }, { code: 'NS17', name: 'Bishan' }, { code: 'NS18', name: 'Braddell' }, { code: 'NS19', name: 'Toa Payoh' }, { code: 'NS20', name: 'Novena' }, { code: 'NS21', name: 'Newton' }, { code: 'NS22', name: 'Orchard' }, { code: 'NS23', name: 'Somerset' }, { code: 'NS24', name: 'Dhoby Ghaut' }, { code: 'NS25', name: 'City Hall' }, { code: 'NS26', name: 'Raffles Place' }, { code: 'NS27', name: 'Marina Bay' }, { code: 'NS28', name: 'Marina South Pier' }]},
//     'Thomson-East Coast Line': {code: 'TEL', station: [{ code: 'TE1', name: 'Woodlands North' }, { code: 'TE2', name: 'Woodlands' }, { code: 'TE3', name: 'Woodlands South' }, { code: 'TE4', name: 'Springleaf' }, { code: 'TE5', name: 'Lentor' }, { code: 'TE6', name: 'Mayflower' }, { code: 'TE7', name: 'Bright Hill' }, { code: 'TE8', name: 'Upper Thomson' }, { code: 'TE9', name: 'Caldecott' }, { code: 'TE11', name: 'Stevens' }, { code: 'TE12', name: 'Napier' }, { code: 'TE13', name: 'Orchard Boulevard' }, { code: 'TE14', name: 'Orchard' }, { code: 'TE15', name: 'Great World' }, { code: 'TE16', name: 'Havelock' }, { code: 'TE17', name: 'Outram Park' }, { code: 'TE18', name: 'Maxwell' }, { code: 'TE19', name: 'Shenton Way' }, { code: 'TE20', name: 'Marina Bay' }, { code: 'TE22', name: 'Gardens by the Bay' }, { code: 'TE23', name: 'Tanjong Rhu' }, { code: 'TE24', name: 'Katong Park' }, { code: 'TE25', name: 'Tanjong Katong' }, { code: 'TE26', name: 'Marine Parade' }, { code: 'TE27', name: 'Marine Terrace' }, { code: 'TE28', name: 'Siglap' }, { code: 'TE29', name: 'Bayshore' }]}
//   };

//   const lineClasses = {
//     'Circle Line':  { buttonClass: 'circle-line', dropdownClass: 'circle-line-dropdown', itemClass: 'circle-line-items' },    
//     'Downtown Line': { buttonClass: 'downtown-line', dropdownClass: 'downtown-line-dropdown', itemClass: 'downtown-line-items'},  
//     'East-West Line': { buttonClass: 'east-west-line', dropdownClass: 'east-west-line-dropdown', itemClass: 'east-west-line-items' },     
//     'North East Line': { buttonClass: 'north-east-line', dropdownClass: 'north-east-line-dropdown', itemClass: 'north-east-line-items' },     
//     'North-South Line': { buttonClass: 'north-south-line', dropdownClass: 'north-south-line-dropdown', itemClass: 'north-south-line-items' },   
//     'Thomson-East Coast Line': { buttonClass: 'thomson-east-coast-line', dropdownClass: 'thomson-east-coast-line-dropdown', itemClass: 'thomson-east-coast-line-items' },
//   };
//   const [openLine, setOpenLine] = useState(null);
//   const [selectedStation, setSelectedStation] = useState(null);

//   const handleToggle = (line) => {
//     setOpenLine(openLine === line ? null : line);
//   };

//   const handleStationClick = (station) => {
//     setSelectedStation(station);
//   };

//   const handleClosePopup = () => {
//     setSelectedStation(null);
//   };
//   const [trainData, setTrainData] = useState([]);

//   async function getTrainData() {
//     try {
//       const response = await fetch('http://localhost:4000/api/train-data');
//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }
//       const data = await response.json();
//       console.log('Fetched train data:', data); 
//       setTrainData(data);
//     } catch (error) {
//       console.error('Error fetching train data:', error);
//     }
//   }

//   useEffect(() => {
//     getTrainData();
//   }, []);

//   const getCrowdLevel = (line, stationCode) => {
//     if (trainData[line] && trainData[line][stationCode]) {
//         return trainData[line][stationCode].CrowdLevel || 'unknown';
//     }
//     return 'unknown';
// };
//   const CrowdLabel = (level) => {
//     switch (level) {
//         case 'l':
//             return 'Low';
//         case 'm':
//             return 'Medium';
//         case 'h':
//             return 'High';
//         default:
//             return 'Unknown';
//     }
//   };

//   return (
//     <div>
//       {Object.keys(mrtLines).map((line) => (
//         <div key={line}>
//           {/* Line Banner Button */}
//           <button 
//             onClick={() => handleToggle(line)} 
//             className={`mrt-line-button ${lineClasses[line].buttonClass}`}
//           >
//             <span className={`station-code-box-${line.toLowerCase().replace(/\s+/g, '-')}`}>
//               <span className="line-code">{mrtLines[line].code}</span>
//             </span> 
//             {line}
//           </button>
//           {/* Directly display list of MRT station */}
//         {openLine === line && (
//           <ul className={`mrt-station-list ${lineClasses[line].dropdownClass}`}>
//             {mrtLines[line].station.map((station, index) => (
//               <li key={index} className={`mrt-station-item ${lineClasses[line].itemClass}`}>
//                 <button
//                 key={station.code}
//                 className={`station-code-box-${line.toLowerCase().replace(/\s+/g, '-')}`}
//                 onClick={() => handleStationClick(station)}>
//                 <span className="station-code">{station.code}</span>
//                 <span className="station-name">{station.name}</span>
//                 </button> 
//                 <span
//                 className={`crowd-density-indicator ${getCrowdLevel(mrtLines[line].code, station.code)}`}
//                 title={getCrowdLevel(mrtLines[line].code, station.code)}
//                 >{CrowdLabel(getCrowdLevel(mrtLines[line].code, station.code))}</span>
//               </li>
//           ))}
//             </ul>
//           )}
//         </div>
//       ))}
//         {selectedStation && (
//         <StationPopup
//           station={selectedStation}
//           onClose={handleClosePopup}
//         />
//       )}
//     </div>
//   );
// };

// export default MRTLines;
