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
    <div className="nearby-Stations-list">
      {stations.length > 0 ? (
        <>
          <h2>MRT near you:</h2>
          <ul>
            {stations.map((station, index) => (
              <li key={index} className="station-item">
                <span className="station-code">{station.name}</span>
                <div className="station-info">
                  <div className="station-name">{station.name}</div>
                  <div className="station-distance">
                    <span className="walking-icon">🚶</span>
                    <span className="distance-text">{station.distance}</span> {/* Replace with actual time */}
                  </div>
                  <div className="station-status">
                    <span className={`status-light`}></span> Light {/* Replace with actual status */}
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
