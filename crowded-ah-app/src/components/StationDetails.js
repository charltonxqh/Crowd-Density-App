import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './StationDetails.css';

const StationDetails = () => {
  const { stationId } = useParams();
  const [ETA, setETA] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentCrowdLevel, forecastCrowdLevel } = location.state || {};

  useEffect(() => {
    const fetchETA = async () => {
      const [line, code, name] = stationId.split('-');
      try {
        const response = await fetch(`http://localhost:4000/api/train-arrival/${name}`);
        if (!response.ok) {
          throw new Error('Failed to fetch station data');
        }
        const data = await response.json();
        setETA(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchETA();
  }, [stationId]);

  if (loading) {
    return <div className="station-details loading">Loading...</div>;
  }
  const [line, code, name] = stationId.split('-');
  const hasArrivalData = ETA && ETA.results && ETA.results.length > 0;

  return (
    <div className="station-details-container">
      <h1>{`${code} ${name}`}</h1>
      <div className="station-info-card">
        <h2>Station Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <label>Next Train ETA</label>
            {loading ? (
          <p>Loading...</p>
        ) : hasArrivalData ? (
          <ul>
            {ETA.results.map((arrival, index) => (
              <ol key={index}>
                Next Train Arrival: {arrival.next_train_arr} mins - (Destination: {arrival.next_train_destination})
              </ol>
            ))}
          </ul>
        ) : (
          <span>No arrival data available.</span>
        )}
          </div>
          <div className="info-item">
            <label>Real-Time Crowd Level</label>
            <span>{currentCrowdLevel|| 'N/A'}</span>
          </div>
          <div className="info-item">
            <label>Forecast Crowd Level</label>
            <span>{forecastCrowdLevel|| 'N/A'}</span>
          </div>
          <button className="back-button" onClick={() => navigate('/stations')}>← Back to Stations</button>
        </div>
      </div>
    </div>
  );
};

export default StationDetails;