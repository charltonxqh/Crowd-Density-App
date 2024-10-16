import React from "react";
import './styles.css'; // Assuming you will store the CSS in this file

const StatisticsUI = () => {
    return (
        <div className="statistics-page">
            <h1 className="title">Statistics</h1>
            
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
                <h2 className="subtitle">MOST Crowded Stations (2024 Week 31)</h2>
                <ul className="station-list">
                    <li className="station-item">1. <span className="station-code green">EW25</span> Chinese Garden</li>
                    <li className="station-item">2. <span className="station-code green">EW1</span> Pasir Ris</li>
                    <li className="station-item">3. <span className="station-code red">NS7</span> Kranji</li>
                    <li className="station-item">4. <span className="station-code red">NS2</span> Bukit Batok</li>
                    <li className="station-item">5. <span className="station-code purple">NE1</span> HarbourFront</li>
                </ul>
            </div>
        </div>
    );
};

export default StatisticsUI;
