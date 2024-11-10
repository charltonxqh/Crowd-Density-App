/**
 * @fileoverview StationDetails component displays detailed information for a selected station, including
 * real-time train arrival times and forecasted crowd density data. It fetches data from the server based on the station ID
 * in the URL and displays both current and forecasted crowd levels.
 * @author Meagan Eng Pei Ying, Liaw Rui Xian, Choo Yi Ken
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './StationDetails.css';

/**
 * StationDetails component that renders detailed information for a specific MRT station, including:
 * - Next train arrival times (ETA)
 * - Real-time crowd level
 * - Forecasted crowd density over time intervals
 *
 * @component
 * @returns {JSX.Element} Rendered StationDetails component.
 */
const StationDetails = () => {
  const { stationId } = useParams();
  const [ETA, setETA] = useState(null);
  const [forecastCrowdDensity, setForecastCrowdDensity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentCrowdLevel } = location.state || {};
  const [line, code, name] = stationId.split('-');
  const hasArrivalData = ETA && ETA.results && ETA.results.length > 0;

  /**
   * useEffect hook that fetches the station ETA and forecast crowd density when the stationId changes.
   * It calls `fetchETA` to get the next train arrival times and `fetchForecastCrowdDensity` to get the forecast crowd density.
   * Updates the component state with the fetched data and handles loading and error states.
   */
  useEffect(() => {
    /**
     * Fetches the real-time ETA for the given station.
     * @async
     * @function
     * @returns {Promise<void>} Updates the ETA state with the fetched data.
     */
    const fetchETA = async () => {
      const [line, code, name] = stationId.split('-');
      try {
        const response = await axios.get(`http://localhost:4000/api/train-arrival/${name}`);
        setETA(response.data);
      } catch (error) {
        setError('Failed to fetch station data');
      }
    };

    /**
     * Fetches the forecast crowd density data for the given station.
     * @async
     * @function
     * @returns {Promise<void>} Updates the forecastCrowdDensity state with the fetched data.
     */
    const fetchForecastCrowdDensity = async () => {
      const [line, code] = stationId.split('-');
      try {
        const response = await axios.get(`http://localhost:4000/api/station-forecast/${line}/${code}`);
        setForecastCrowdDensity(response.data);
      } catch (error) {
        setError('Failed to fetch forecast crowd density data');
      } finally {
        setLoading(false);
      }
    };

    fetchETA();
    fetchForecastCrowdDensity();
  }, [stationId]);

  if (loading) {
    return <div className="station-details loading">Loading...</div>;
  }

  /**
   * Formats the time interval for forecasted crowd density data, showing a 30-minute range.
   * @param {string} startTime - Start time of the forecast interval.
   * @returns {string} Formatted time interval in "HHMM - HHMM" format.
   */
  const formatTimeInterval = (startTime) => {
    const start = new Date(startTime);
    const end = new Date(start);
    end.setMinutes(start.getMinutes() + 30);

    const formatTime = (date) => {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}${minutes}`;
    };

    return `${formatTime(start)} - ${formatTime(end)}`;
  };

  /**
   * Determines the color to represent different crowd levels for visual feedback.
   * @param {string} level - The crowd level (e.g., 'l', 'm', 'h', 'Low', 'Medium', 'High').
   * @returns {string} A color code based on the crowd level.
   */
  const getCrowdLevelColor = (level) => {
    switch (level) {
      case 'l': return 'green';
      case 'm': return 'yellow';
      case 'h': return 'red';
      case 'Low': return 'green';
      case 'Medium': return 'yellow';
      case 'High': return 'red';
      default: return '#9ca3af';
    }
  };

  /**
   * Returns a readable label for each crowd level, standardizing format.
   * @param {string} level - The crowd level (e.g., 'l', 'm', 'h', 'Low', 'Medium', 'High').
   * @returns {string} A human-readable label for the crowd level.
   */
  const getCrowdLevelLabel = (level) => {
    switch (level) {
      case 'l': return 'Low';
      case 'm': return 'Medium';
      case 'h': return 'High';
      case 'Low': return 'Low';
      case 'Medium': return 'Medium';
      case 'High': return 'High';
      default: return 'Unknown';
    }
  };

  return (
    <div className="station-details-container">
      <h1>{`${code} ${name}`}</h1>
      <div className="station-info-card">
        <h2>Station Information</h2>
        
        <div className="info-grid-row">
          <div className="info-item">
            <label>Next Train ETA</label>
            {hasArrivalData ? (
              <ul>
                {ETA.results.map((arrival, index) => (
                  <li key={index}>
                    Next Train Arrival: {arrival.next_train_arr} mins - (Destination: {arrival.next_train_destination})
                  </li>
                ))}
              </ul>
            ) : (
              <span>No arrival data available.</span>
            )}
          </div>
          <div className="info-item">
            <label>Real-Time Crowd Level</label>
            <div className="crowd-level">
              <div
                className="crowd-level-dot"
                style={{ backgroundColor: getCrowdLevelColor(currentCrowdLevel) }}
              ></div>
              <span>{getCrowdLevelLabel(currentCrowdLevel)}</span>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <hr className="divider-line" />

        <div className="info-item">
          <label>Forecast Crowd Density</label>
          <div className="forecast-grid">
            {forecastCrowdDensity.length > 0 ? (
              forecastCrowdDensity.map((forecast, index) => (
                <div key={index} className="forecast-column">
                  {formatTimeInterval(forecast.Start)} 
                  <div className="crowd-level">
                    <div
                      className="crowd-level-dot"
                      style={{ backgroundColor: getCrowdLevelColor(forecast.CrowdLevel) }}
                    ></div>
                    <span>{getCrowdLevelLabel(forecast.CrowdLevel)}</span>
                  </div>
                </div>
              ))
            ) : (
              <span>No forecast data available.</span>
            )}
          </div>
        </div>

        <button className="back-button" onClick={() => navigate('/stations')}>← Back to Stations</button>
      </div>
    </div>
  );
};

export default StationDetails;















