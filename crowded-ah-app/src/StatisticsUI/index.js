import React, { useEffect, useState } from "react";
import './styles.css';
import sortedTrainData from './sortedTrainData.json'; // Import JSON file directly

const StatisticsUI = () => {
    const [stations, setStations] = useState([]);

    useEffect(() => {
        // Sort stations based on total volume in descending order
        const sortedStations = sortedTrainData.sort((a, b) => b.total_volume - a.total_volume);
        // Get top 10 most crowded stations
        const topStations = sortedStations.slice(0, 10);
        setStations(topStations);
    }, []);

    return (
        <div className="statistics-page">            
            <div className="graph-section">
                <h2 className="subtitle">Periodic statistical analysis of crowd density data</h2>
                <div className="graph-container">
                    {/* Placeholder for the graph */}
                    <canvas id="crowdDensityGraph"></canvas>
                </div>
                <div className="download-buttons">
                    <button className="download-btn pdf">Download as PDF</button>
                    <button className="download-btn csv">Download as CSV</button>
                    <button className="download-btn xml">Download as XML</button>
                </div>
            </div>

            <div className="crowded-stations-section">
                <h2 className="subtitle">Top 10 Most Crowded Stations (Sorted by Total Volume)</h2>
                <ul className="station-list">
                    {stations.length > 0 ? (
                        stations.map((station, index) => (
                            <li key={index} className="station-item">
                                {index + 1}. <span className="station-code">{station.station_code}</span>
                                <br />
                                <strong>Station:</strong> {station.station_code.toLocaleString()}
                            </li>
                        ))
                    ) : (
                        <li>Loading...</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default StatisticsUI;
