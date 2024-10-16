import React from 'react';
import './MRTNearU.css';
class MRTData {
    constructor(lineCode, lineColor, station, walkTime, crowdLevel, crowdClass) {
      this.line = { code: lineCode, color: lineColor };
      this.station = station;
      this.walkTime = walkTime;
      this.crowd = { level: crowdLevel, class: crowdClass };
    }
  }
  
  const mrtData = [
    new MRTData('EW25', 'green', 'Chinese Garden', '2 mins', 'Light', 'light'),
    new MRTData('EW24', 'red', 'Jurong East', '5 mins', 'Heavy', 'heavy'),
    new MRTData('NS1', 'red', 'Jurong East', '9 mins', 'Moderate', 'moderate')
  ];  
const MRTNearU = () => {
    return (
      <div className="nearby-mrt">
        <h2>MRT near you:</h2>
        <ul>
          {mrtData.map((item, index) => (
            <li key={index}>
              <span className={`line ${item.line.color}`}>{item.line.code}</span> {item.station}
              <span className="walk-time">{item.walkTime}</span>
              <span className={`crowd ${item.crowd.class}`}>{item.crowd.level}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };  
export default MRTNearU;
