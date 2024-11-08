import React, { useEffect, useState } from "react";
import "./NearbyStationList.css";
import stationsInfo from "../stationsInfo.json";

const NearbyStationList = ({ stations = [] }) => {
  const [trainData, setTrainData] = useState([]);

  async function getTrainData() {
    try {
      const response = await fetch("http://localhost:4000/api/train-data");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Fetched train data:", data);

      setTrainData(data);
    } catch (error) {
      console.error("Error fetching train data:", error);
    }
  }

  useEffect(() => {
    getTrainData(); // Fetch data initially

    const intervalId = setInterval(() => {
      getTrainData(); // Fetch data every 10 seconds
    }, 10000); // 10000 milliseconds = 10 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  const getCrowdLevel = (line, stationCode) => {
    return trainData?.realTime?.[line]?.[stationCode]?.CrowdLevel || "unknown";
  };

  const CrowdLabel = (level) => {
    switch (level) {
      case "l":
        return "Low";
      case "m":
        return "Medium";
      case "h":
        return "High";
      default:
        return "Unknown";
    }
  };

  const getStationCodeColor = (stationCode) => {
    if (stationCode.startsWith("NS")) {
      return "#d42e12";
    } else if (stationCode.startsWith("EW") || stationCode.startsWith("CG")) {
      return "#009645"; 
    } else if (stationCode.startsWith("CC") || stationCode.startsWith("CE")) {
      return "#ffa515"; 
    } else if (stationCode.startsWith("DT")) {
      return "#005ec4";
    } else if (stationCode.startsWith("NE")) {
      return "#9900aa"; 
    } else if (stationCode.startsWith("TE")) {
      return "#9D5B25"; 
    } else if (stationCode.startsWith("BP") || stationCode.startsWith("SW") || stationCode.startsWith("STC") || stationCode.startsWith("SE") || stationCode.startsWith("PE") || stationCode.startsWith("PTC") || stationCode.startsWith("PW")) {
      return "#718472"; 
    } else {
      return "#000000"; 
    }
  };
  return (
    <div className="nearby-stations-list">
      {stations.length > 0 ? (
        <>
          <h2>MRT near you:</h2>
          <ul>
            {stations.map((station, index) => {
              // Check if the station name exists in stationsInfo
              const stationDetails = stationsInfo[station.name];
              if (!stationDetails) {
                return null; // Skip this station if no details are found
              }

              return (
                <li key={index} className="nearby-station-item">
                  {Array.isArray(stationDetails) ? (
                    // If multiple station codes exist for this station
                    stationDetails.map((info, i) => (
                      <div key={i} className="station-info-wrapper">
                        <span
                          className="nearby-station-code"
                          style={{ backgroundColor: getStationCodeColor(info.stationCode) }}
                        >
                          {info.stationCode}
                        </span>
                        <div className="nearby-station-info">
                          <span className="nearby-station-name">
                            {station.name}
                          </span>
                          <div className="nearby-station-distance">
                            <span className="walking-icon">🚶</span>
                            <span className="distance-text">
                              {station.distance || "Unknown"}
                            </span>
                          </div>
                          <div className="nearby-crowd-density-indicator">
                            <span
                              className={`nearby-crowd-density-circle ${getCrowdLevel(
                                info.trainLine,
                                info.stationCode
                              )}`}
                            ></span>
                            <span className="nearby-crowd-density-text">
                              {CrowdLabel(
                                getCrowdLevel(info.trainLine, info.stationCode)
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    // If only one station code exists for this station
                    <div className="station-info-wrapper">
                      <span
                        className="nearby-station-code"
                        style={{
                          backgroundColor: getStationCodeColor(
                            stationsInfo[station.name]?.stationCode
                          ),
                        }}
                      >
                        {stationsInfo[station.name]?.stationCode || "N/A"}
                      </span>
                      <div className="nearby-station-info">
                        <span className="nearby-station-name">
                          {station.name}
                        </span>
                        <div className="nearby-station-distance">
                          <span className="walking-icon">🚶</span>
                          <span className="distance-text">
                            {station.distance || "Unknown"}
                          </span>
                        </div>
                        <div className="nearby-crowd-density-indicator">
                          <span
                            className={`nearby-crowd-density-circle ${getCrowdLevel(
                              stationsInfo[station.name]?.trainLine,
                              stationsInfo[station.name]?.stationCode
                            )}`}
                          ></span>
                          <span className="nearby-crowd-density-text">
                            {CrowdLabel(
                              getCrowdLevel(
                                stationsInfo[station.name]?.trainLine,
                                stationsInfo[station.name]?.stationCode
                              )
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p className="no-stations-message">
          No stations found within the specified range.
        </p>
      )}
    </div>
  );
};

export default NearbyStationList;
