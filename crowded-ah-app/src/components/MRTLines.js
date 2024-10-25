import React, { useState } from 'react';
import './MRTLines.css';

const MrtDropdown = () => {
  const mrtLines = {
    'Circle Line': ['Marina Bay', 'Bayfront', 'Dhoby Ghaut', 'Bras Basah', 'Esplanade', 'Promenade', 'Nicoll Highway', 'Stadium', 'Mountbatten', 'Dakota', 'Paya Lebar', 'MacPherson', 'Tai Seng', 'Bartley', 'Serangoon', 'Lorong Chuan', 'Bishan', 'Marymount', 'Caldecott', 'Botanic Gardens', 'Farrer Road', 'Holland Village', 'Buona Vista', 'one-north', 'Kent Ridge', 'Haw Par Villa', 'Pasir Panjang', 'Labrador Park', 'Telok Blangah', 'HarbourFront'],
    'Downtown Line': ['Bukit Panjang', 'Cashew', 'Hillview', 'Beauty World', 'King Albert Park', 'Sixth Avenue', 'Tan Kah Kee', 'Botanic Gardens', 'Stevens', 'Newton', 'Little India', 'Rochor', 'Bugis', 'Promenade', 'Bayfront', 'Downtown', 'Telok Ayer', 'Chinatown', 'Fort Canning', 'Bencoolen', 'Jalan Besar', 'Bendemeer', 'Geylang Bahru', 'Mattar', 'MacPherson', 'Ubi', 'Kaki Bukit', 'Bedok North', 'Bedok Reservoir', 'Tampines West', 'Tampines', 'Tampines East', 'Upper Changi', 'Expo'],
    'East-West Line': ['Changi Airport', 'Expo', 'Pasir Ris', 'Tampines', 'Simei', 'Tanah Merah', 'Bedok', 'Kembangan', 'Eunos', 'Paya Lebar', 'Aljunied', 'Kallang', 'Lavender', 'Bugis', 'City Hall', 'Raffles Place', 'Tanjong Pagar', 'Outram Park', 'Tiong Bahru', 'Redhill', 'Queenstown', 'Commonwealth', 'Buona Vista', 'Dover', 'Clementi', 'Jurong East', 'Chinese Garden', 'Lakeside', 'Boon Lay', 'Pioneer', 'Joo Koon', 'Gul Circle', 'Tuas Crescent', 'Tuas West Road', 'Tuas Link'],
    'North East Line': ['HarbourFront', 'Outram Park', 'Chinatown', 'Clarke Quay', 'Dhoby Ghaut', 'Little India', 'Farrer Park', 'Boon Keng', 'Potong Pasir', 'Woodleigh', 'Serangoon', 'Kovan', 'Hougang', 'Buangkok', 'Sengkang', 'Punggol'],
    'North-South Line': ['Jurong East', 'Bukit Batok', 'Bukit Gombak', 'Choa Chu Kang', 'Yew Tee', 'Kranji', 'Marsiling', 'Woodlands', 'Admiralty', 'Sembawang', 'Canberra', 'Yishun', 'Khatib', 'Yio Chu Kang', 'Ang Mo Kio', 'Bishan', 'Braddell', 'Toa Payoh', 'Novena', 'Newton', 'Orchard', 'Somerset', 'Dhoby Ghaut', 'City Hall', 'Raffles Place', 'Marina Bay', 'Marina South Pier'],
    'Thomson-East Coast Line': ['Woodlands North', 'Woodlands', 'Woodlands South', 'Springleaf', 'Lentor', 'Mayflower', 'Bright Hill', 'Upper Thomson', 'Caldecott', 'Stevens', 'Napier', 'Orchard Boulevard', 'Orchard', 'Great World', 'Havelock', 'Outram Park', 'Maxwell', 'Shenton Way', 'Marina Bay', 'Gardens by the Bay', 'Tanjong Rhu', 'Katong Park', 'Tanjong Katong', 'Marine Parade', 'Marine Terrace', 'Siglap', 'Bayshore'],
  };

  const lineClasses = {
    'Circle Line':  { buttonClass: 'circle-line', dropdownClass: 'circle-line-dropdown', itemClass: 'circle-line-items' },    
    'Downtown Line': { buttonClass: 'downtown-line', dropdownClass: 'downtown-line-dropdown', itemClass: 'downtown-line-items'},  
    'East-West Line': { buttonClass: 'east-west-line', dropdownClass: 'east-west-line-dropdown', itemClass: 'east-west-line-items' },     
    'North East Line': { buttonClass: 'north-east-line', dropdownClass: 'north-east-line-dropdown', itemClass: 'north-east-line-items' },     
    'North-South Line': { buttonClass: 'north-south-line', dropdownClass: 'north-south-line-dropdown', itemClass: 'north-south-line-items' },   
    'Thomson-East Coast Line': { buttonClass: 'thomson-east-coast-line', dropdownClass: 'thomson-east-coast-line-dropdown', itemClass: 'thomson-east-coast-line-items' },
  }

  const [openLine, setOpenLine] = useState(null);

  const handleToggle = (line) => {
    setOpenLine(openLine === line ? null : line); // Toggle open state
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
            {line}
          </button>
          
          {/* Directly display list of MRT stations */}
          {openLine === line && (
            <ul className={`mrt-station-list ${lineClasses[line].dropdownClass}`}> 
              {mrtLines[line].map((station, index) => (
                <li key={index} className={`mrt-station-item ${lineClasses[line].itemClass}`} >
                  {station}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default MrtDropdown;
