import React, { useEffect, useState } from "react";
import "./NearbyStationList.css";
import stationsInfo from "../stationsInfo.json";

const NearbyStationList = ({ stations = [] }) => {
  const [trainData, setTrainData] = useState([]);

  async function getTrainData() {
    try {
      // const response = await fetch("../mockAPI/mockRT-EWL.json");
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
    getTrainData();
  }, []);

  const getCrowdLevel = (line, stationCode) => {
    return trainData.realTime?.[line]?.[stationCode]?.CrowdLevel || "unknown";
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

  return (
    <div className="nearby-stations-list">
      {stations.length > 0 ? (
        <>
          <h2>MRT near you:</h2>
          <ul>
            {stations.map((station, index) => (
              <li key={index} className="nearby-station-item">
                {Array.isArray(stationsInfo[station.name]) ? (
                  // If multiple station codes exist for this station
                  stationsInfo[station.name].map((info, i) => (
                    <div key={i} className="station-info-wrapper">
                      <span className="nearby-station-code">
                        {info.stationCode}
                      </span>
                      <div className="nearby-station-info">
                        <span className="nearby-station-name">
                          {station.name}
                        </span>
                        <div className="nearby-station-distance">
                          <span className="walking-icon">🚶</span>
                          <span className="distance-text">
                            {station.distance}
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
                    <span className="nearby-station-code">
                      {stationsInfo[station.name].stationCode}
                    </span>
                    <div className="nearby-station-info">
                      <span className="nearby-station-name">
                        {station.name}
                      </span>
                      <div className="nearby-station-distance">
                        <span className="walking-icon">🚶</span>
                        <span className="distance-text">
                          {station.distance}
                        </span>
                      </div>
                      <div className="nearby-crowd-density-indicator">
                        <span
                          className={`nearby-crowd-density-circle ${getCrowdLevel(
                            stationsInfo[station.name].trainLine,
                            stationsInfo[station.name].stationCode
                          )}`}
                        ></span>
                        <span className="nearby-crowd-density-text">
                          {CrowdLabel(
                            getCrowdLevel(
                              stationsInfo[station.name].trainLine,
                              stationsInfo[station.name].stationCode
                            )
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
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
