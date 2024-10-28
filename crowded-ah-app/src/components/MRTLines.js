import React, { useState } from 'react';
import StationPopup from './StationPopup';
//import { fetchCrowdDensity } from './API';
import './MRTLines.css';

const MRTLines = () => {

  const mrtLines = {
    'Circle Line': {code: 'CC',stations: [{ code: 'CC1', name: 'Marina Bay' },{ code: 'CC2', name: 'Bayfront' },{ code: 'CC3', name: 'Dhoby Ghaut' },{ code: 'CC4', name: 'Bras Basah' },{ code: 'CC5', name: 'Esplanade' },{ code: 'CC6', name: 'Promenade' },{ code: 'CC7', name: 'Nicoll Highway' },{ code: 'CC8', name: 'Stadium' },{ code: 'CC9', name: 'Mountbatten' },{ code: 'CC10', name: 'Dakota' },{ code: 'CC11', name: 'Paya Lebar' },{ code: 'CC12', name: 'MacPherson' },{ code: 'CC13', name: 'Tai Seng' },{ code: 'CC14', name: 'Bartley' },{code: 'CC15', name: 'Serangoon' },{ code: 'CC16', name: 'Lorong Chuan' },{ code: 'CC17', name: 'Bishan' },{ code: 'CC18', name: 'Marymount' },{ code: 'CC19', name: 'Caldecott' },{ code: 'CC20', name: 'Botanic Gardens' },{ code: 'CC21', name: 'Farrer Road' },{ code: 'CC22', name: 'Holland Village' },{ code: 'CC23', name: 'Buona Vista' },{ code: 'CC24', name: 'one-north' },{ code: 'CC25', name: 'Kent Ridge' },{ code: 'CC26', name: 'Haw Par Villa' },{ code: 'CC27', name: 'Pasir Panjang' },{ code: 'CC28', name: 'Labrador Park' },{ code: 'CC29', name: 'Telok Blangah' },{ code: 'CC30', name: 'HarbourFront' }]},
    'Downtown Line': {code: 'DT',stations: [{ code: 'DT1', name: 'Bukit Panjang' },{ code: 'DT2', name: 'Cashew' },{ code: 'DT3', name: 'Hillview' },{ code: 'DT4', name: 'Beauty World' },{ code: 'DT5', name: 'King Albert Park' },{ code: 'DT6', name: 'Sixth Avenue' },{ code: 'DT7', name: 'Tan Kah Kee' },{ code: 'DT8', name: 'Botanic Gardens' },{ code: 'DT9', name: 'Stevens' },{ code: 'DT10', name: 'Newton' },{ code: 'DT11', name: 'Little India' },{ code: 'DT12', name: 'Rochor' },{ code: 'DT13', name: 'Bugis' },{ code: 'DT14', name: 'Promenade' },{ code: 'DT15', name: 'Bayfront' },{ code: 'DT16', name: 'Downtown' },{ code: 'DT17', name: 'Telok Ayer' },{ code: 'DT18', name: 'Chinatown' },{ code: 'DT19', name: 'Fort Canning' },{ code: 'DT20', name: 'Bencoolen' },{ code: 'DT21', name: 'Jalan Besar' },{ code: 'DT22', name: 'Bendemeer' },{ code: 'DT23', name: 'Geylang Bahru' },{ code: 'DT24', name: 'Mattar' },{ code: 'DT25', name: 'MacPherson' },{ code: 'DT26', name: 'Ubi' },{ code: 'DT27', name: 'Kaki Bukit' },{ code: 'DT28', name: 'Bedok North' },{ code: 'DT29', name: 'Bedok Reservoir' },{ code: 'DT30', name: 'Tampines West' },{ code: 'DT31', name: 'Tampines' },{ code: 'DT32', name: 'Tampines East' },{ code: 'DT33', name: 'Upper Changi' },{ code: 'DT34', name: 'Expo' }]},
    'East-West Line': {code: 'EW', stations: [{ code: 'EW1', name: 'Changi Airport' },{ code: 'EW2', name: 'Expo' },{ code: 'EW3', name: 'Pasir Ris' },{ code: 'EW4', name: 'Tampines' },{ code: 'EW5', name: 'Simei' },{ code: 'EW6', name: 'Tanah Merah' },{ code: 'EW7', name: 'Bedok' },{ code: 'EW8', name: 'Kembangan' },{ code: 'EW9', name: 'Eunos' },{ code: 'EW10', name: 'Paya Lebar' },{ code: 'EW11', name: 'Aljunied' }, { code: 'EW12', name: 'Kallang' },{ code: 'EW13', name: 'Lavender' },{ code: 'EW14', name: 'Bugis' },{ code: 'EW15', name: 'City Hall' },{ code: 'EW16', name: 'Raffles Place' },{ code: 'EW17', name: 'Tanjong Pagar' },{ code: 'EW18', name: 'Outram Park' },{ code: 'EW19', name: 'Tiong Bahru' },{ code: 'EW20', name: 'Redhill' },{ code: 'EW21', name: 'Queenstown' },{ code: 'EW22', name: 'Commonwealth' },{ code: 'EW23', name: 'Buona Vista' },{ code: 'EW24', name: 'Dover' },{ code: 'EW25', name: 'Clementi' },{ code: 'EW26', name: 'Jurong East' },{ code: 'EW27', name: 'Chinese Garden' },{ code: 'EW28', name: 'Lakeside' },{ code: 'EW29', name: 'Boon Lay' },{ code: 'EW30', name: 'Pioneer' },{ code: 'EW31', name: 'Joo Koon' },{ code: 'EW32', name: 'Gul Circle' },{ code: 'EW33', name: 'Tuas Crescent' },{ code: 'EW34', name: 'Tuas West Road' },{ code: 'EW35', name: 'Tuas Link' }]},
    'North East Line': {code: 'NE', stations: [{ code: 'NE1', name: 'HarbourFront' },{ code: 'NE2', name: 'Outram Park' },{ code: 'NE3', name: 'Chinatown' },{ code: 'NE4', name: 'Clarke Quay' },{ code: 'NE5', name: 'Dhoby Ghaut' },{ code: 'NE6', name: 'Little India' },{ code: 'NE7', name: 'Farrer Park' },{ code: 'NE8', name: 'Boon Keng' },{ code: 'NE9', name: 'Potong Pasir' },{ code: 'NE10', name: 'Woodleigh' },{ code: 'NE11', name: 'Serangoon' },{ code: 'NE12', name: 'Kovan' },{ code: 'NE13', name: 'Hougang' },{ code: 'NE14', name: 'Buangkok' },{ code: 'NE15', name: 'Sengkang' },{ code: 'NE16', name: 'Punggol' }]},
    'North-South Line': {code: 'NS', stations: [{ code: 'NS1', name: 'Jurong East' },{ code: 'NS2', name: 'Jurong West' },{ code: 'NS3', name: 'Choa Chu Kang' },{ code: 'NS4', name: 'Kranji' },{ code: 'NS5', name: 'Yew Tee' },{ code: 'NS6', name: 'Bukit Gombak' },{ code: 'NS7', name: 'Bishan' },{ code: 'NS8', name: 'Braddell' },{ code: 'NS9', name: 'Toa Payoh' },{ code: 'NS10', name: 'Novena' },{ code: 'NS11', name: 'Newton' },{ code: 'NS12', name: 'Dhoby Ghaut' },{ code: 'NS13', name: 'City Hall' },{ code: 'NS14', name: 'Raffles Place' },{ code: 'NS15', name: 'Outram Park' },{ code: 'NS16', name: 'Tiong Bahru' },{ code: 'NS17', name: 'Redhill' },{ code: 'NS18', name: 'Queenstown' },{ code: 'NS19', name: 'Commonwealth' },{ code: 'NS20', name: 'Buona Vista' },{ code: 'NS21', name: 'Dover' },{ code: 'NS22', name: 'Clementi' },{ code: 'NS23', name: 'Jurong East' },{ code: 'NS24', name: 'Chinese Garden' },{ code: 'NS25', name: 'Lakeside' },{ code: 'NS26', name: 'Boon Lay' },{ code: 'NS27', name: 'Pioneer' },{ code: 'NS28', name: 'Joo Koon' },{ code: 'NS29', name: 'Gul Circle' },{ code: 'NS30', name: 'Tuas Crescent' },{ code: 'NS31', name: 'Tuas West Road' },{ code: 'NS32', name: 'Tuas Link' }]},
    'Thomson-East Coast Line': {code: 'TE', stations: [{ code: 'TE1', name: 'Woodlands North' },{ code: 'TE2', name: 'Woodlands' },{ code: 'TE3', name: 'Admiralty' },{ code: 'TE4', name: 'Sembawang' },{ code: 'TE5', name: 'Canberra' },{ code: 'TE6', name: 'Sembawang' },{ code: 'TE7', name: 'Mandai' },{ code: 'TE8', name: 'Bishan' },{ code: 'TE9', name: 'Marymount' },{ code: 'TE10', name: 'Caldecott' },{ code: 'TE11', name: 'Botanic Gardens' },{ code: 'TE12', name: 'Stevens' },{ code: 'TE13', name: 'Newton' },{ code: 'TE14', name: 'Little India' },{ code: 'TE15', name: 'Rochor' },{ code: 'TE16', name: 'Bugis' },{ code: 'TE17', name: 'Promenade' },{ code: 'TE18', name: 'Bayfront' },{ code: 'TE19', name: 'Downtown' }]}
  };

  const lineClasses = {
    'Circle Line':  { buttonClass: 'circle-line', dropdownClass: 'circle-line-dropdown', itemClass: 'circle-line-items' },    
    'Downtown Line': { buttonClass: 'downtown-line', dropdownClass: 'downtown-line-dropdown', itemClass: 'downtown-line-items'},  
    'East-West Line': { buttonClass: 'east-west-line', dropdownClass: 'east-west-line-dropdown', itemClass: 'east-west-line-items' },     
    'North East Line': { buttonClass: 'north-east-line', dropdownClass: 'north-east-line-dropdown', itemClass: 'north-east-line-items' },     
    'North-South Line': { buttonClass: 'north-south-line', dropdownClass: 'north-south-line-dropdown', itemClass: 'north-south-line-items' },   
    'Thomson-East Coast Line': { buttonClass: 'thomson-east-coast-line', dropdownClass: 'thomson-east-coast-line-dropdown', itemClass: 'thomson-east-coast-line-items' },
  };

  const [crowdData, setCrowdData] = useState([]);
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

  return (
    <div>
      {Object.keys(mrtLines).map((line) => (
        <div key={line}>
          {/* Line Banner Button */}
          <button 
            onClick={() => handleToggle(line)} 
            className={`mrt-line-button ${lineClasses[line].buttonClass}`}
          >
            <span className={`station-code-box-${line.toLowerCase().replace(/\s+/g, '-')}`}>
              <span className="line-code">{mrtLines[line].code}</span>
            </span> 
            {line}
          </button>
          {/* Directly display list of MRT stations */}
        {openLine === line && (
          <ul className={`mrt-station-list ${lineClasses[line].dropdownClass}`}>
            {mrtLines[line].stations.map((station, index) => (

              <li key={index} className={`mrt-station-item ${lineClasses[line].itemClass}`}>
                <button
                key={station.code}
                className={`station-code-box-${line.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleStationClick(station)}>
                <span className="station-code">{station.code}</span>
                <span className="station-name">{station.name}</span>
                </button> 
                {
                /* Crowd density indicator 
                <span 
                className={`crowd-density-indicator ${getCrowdInfo(station.code)}`}
                title={getCrowdInfo(station.code)}/>
                */
                }
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

export default MRTLines;
