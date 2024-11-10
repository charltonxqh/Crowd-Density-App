/**
 * @fileoverview LRT Lines component displays a list of MRT lines and their stations. Users can toggle between different MRT lines,
 * view real-time and forecasted crowd density levels for each station, and navigate to individual station detail pages.
 * It also integrates with a map to set marker positions based on selected MRT lines and stations.
 *
 * @authors Meagan Eng Pei Ying, Liaw Rui Xian
 */

import React, { useEffect, useState } from "react";
import "./LRTLines.css";
import stationsData from "../stationsInfo.json";
import { useNavigate } from "react-router-dom";

/**
 * Object representing station lines with their respective station names.
 * @type {Object<string, string[]>}
 */
export const stationLines = {
  BPL: ['Choa Chu Kang', 'South View','Keat Hong','Teck Whye' ,'Pheonix','Bukit Panjang','Petir','Pending', 'Bangkit','Fajar','Segar','Jelapang','Senja'],
  SLRT: ['Cheng Lim','Farmway','Kupang','Thanggam','Fernvale','Layar' , 'Tongkang','Renjong','Sengkang','Compassvale','Rumbia','Bakau','Kangkar','Ranggung'],
  PLRT: ['Cove','Meridian','Coral Edge','Riviera','Kadaloor','Oasis','Damai','Punggol','Sam Kee' ,'Teck Lee','Punggol Point','Samudera', 'Nibong','Sumang','Soo Teck'],
};

/**
 * LRTLines component to display and interact with LRT lines and stations.
 *
 * @param {Object} props - The props for the LRTLines component.
 * @param {Function} props.onLineChange - Callback function to handle line selection.
 * @param {string} props.selectedLine - The currently selected line.
 * @param {Function} props.setMarkerPositions - Callback function to update marker positions on the map.
 * @returns {JSX.Element} The rendered LRTLines component.
 */
const LRTLines = ({ onLineChange, selectedLine, setMarkerPositions }) => {
  const validLines = ["BPL", "SLRT", "PLRT"];
  const orderedLines = ["BPL", "SLRT", "PLRT"];

  const lineNames = {
    BPL: "Bukit-Panjang Line",
    SLRT: "Sengkang Line",
    PLRT: "Punggol Line",
  };

  const [openLine, setOpenLine] = useState(null);
  const [trainData, setTrainData] = useState([]);
  const navigate = useNavigate();

  /**
   * Parses station data to group by valid LRT lines.
   * @type {Object<string, {code: string, station: Array<Object>}>}
   */
  const lrtLines = Object.entries(stationsData).reduce(
    (acc, [stationName, data]) => {
      const stationArray = Array.isArray(data) ? data : [data];
      stationArray.forEach(({ trainLine, stationCode, lat, lng }) => {
        if (validLines.includes(trainLine)) {
          acc[trainLine] = acc[trainLine] || { code: trainLine, station: [] };
          acc[trainLine].station.push({
            code: stationCode,
            name: stationName,
            lat,
            lng,
          });
        }
      });
      return acc;
    },
    {}
  );

  /**
   * Toggles the visibility of stations for a line, setting the marker positions.
   * @param {string} line - The code of the line to toggle.
   */
  const handleToggle = (line) => {
    const isOpen = openLine === line;
    setOpenLine(openLine === line ? null : line);

    if (!isOpen) {
      onLineChange(line);
      const markerPositions = lrtLines[line].station.map((station) => ({
        lat: station.lat,
        lng: station.lng,
      }));
      setMarkerPositions(markerPositions);
    } else {
      setMarkerPositions([]);
    }
  };

  /**
   * Handles station selection, updates map marker, and navigates to the station detail page.
   *
   * @param {string} line - The MRT line code.
   * @param {Object} station - The station object containing details.
   */
  const handleStationClick = (line, station) => {
    setMarkerPositions([{ lat: station.lat, lng: station.lng }]);
    const currentCrowdLevel = CrowdLabel(getCrowdLevel(line, station.code));
    const forecastCrowdLevel = CrowdLabel(
      getCrowdLevel(line, station.code, true)
    );
    navigate(
      `/station/${line}-${station.code}-${encodeURIComponent(station.name)}`,
      {
        state: {
          currentCrowdLevel,
          forecastCrowdLevel,
        },
      }
    );
  };

  /**
   * Fetches train crowd data from the API and sets it in the component state.
   */
  useEffect(() => {
    const fetchTrainData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/train-data");
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        setTrainData(data);
      } catch (error) {
        console.error("Error fetching train data:", error);
      }
    };
    fetchTrainData();
  }, []);

  /**
   * Retrieves the crowd level for a specific station.
   *
   * @param {string} line - The MRT line code.
   * @param {string} stationCode - The code of the station.
   * @param {boolean} [isForecast=false] - Whether to retrieve forecast or real-time crowd data.
   * @returns {string} - The crowd level ('l' for Low, 'm' for Medium, 'h' for High).
   */
  const getCrowdLevel = (line, stationCode, isForecast = false) => {
    const type = isForecast ? "forecast" : "realTime";
    if (
      trainData &&
      trainData[type] &&
      trainData[type][line] &&
      trainData[type][line][stationCode]
    ) {
      return trainData[type][line][stationCode].CrowdLevel || "unknown";
    }
    return "unknown";
  };

  /**
   * Maps crowd level abbreviations to human-readable labels.
   * @param {string} level - The crowd level abbreviation ('l', 'm', 'h').
   * @returns {string} - The full label for the crowd level ('Low', 'Medium', 'High').
   */
  const crowdLevels = { l: "Low", m: "Medium", h: "High" };
  const CrowdLabel = (level) => crowdLevels[level] || "Unknown";

  return (
    <div>
      {orderedLines.map(
        (line) =>
          lrtLines[line] && (
            <div key={line}>
              <button
                onClick={() => handleToggle(line)}
                className={`mrt-line-button ${
                  line === selectedLine ? "active" : ""
                }`}
              >
                <span className={`line-code-box ${line}`}>
                  <span className="line-code">{line}</span>
                </span>
                {lineNames[line]}
              </button>
              {openLine === line && (
                <ul className={`lrt-station-list lrt-station-list-${line}`}>
                  {lrtLines[line].station
                    .sort(
                      (a, b) =>
                        stationLines[line].indexOf(a.name) -
                        stationLines[line].indexOf(b.name)
                    )
                    .map((station, index) => (
                      <li key={index} className="lrt-station-item">
                        <button
                          className={`lrt-station-button ${line}`}
                          onClick={() => handleStationClick(line, station)}
                        >
                          <span className="station_code">
                            {station.code} |{" "}
                          </span>
                          <span className="station_name">{station.name}</span>
                        </button>
                        <div className="crowd-density">
                          <div className="now-density-container">
                            <span>Now:</span>
                            <div className="now-crowd-density-box">
                              <div className="crowd-level-indicator">
                                <div
                                  className={`crowd-level-color ${getCrowdLevel(
                                    line,
                                    station.code
                                  )}`}
                                ></div>
                                <div className="crowd-level-label">
                                  {CrowdLabel(
                                    getCrowdLevel(line, station.code)
                                  )}
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
      )}
    </div>
  );
};
export default LRTLines;
