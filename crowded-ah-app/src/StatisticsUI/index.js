import React, { useState } from "react";
import Papa from "papaparse"; // CSV parsing
import stationsInfo from "../stationsInfo.json"; // Importing the stations info JSON file
import { Line } from "react-chartjs-2"; // Importing Line chart from Chart.js
import Chart from "chart.js/auto"; // Required for Chart.js to work properly
import "./styles.css";

const StatisticsUI = () => {
    const [stations, setStations] = useState([]); // To store top 10 stations
    const [currentStationIndex, setCurrentStationIndex] = useState(0); // To track which station is displayed in the graph

    const options = {
        plugins: {
            legend: {
                display: false, // Remove the legend
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time' // X-axis label
                }
            },
            y: {
                beginAtZero: true, // Ensure the graph always starts at zero
                ticks: {
                    display: false // Hide Y-axis labels
                }
            }
        }
    };


    // Function to handle file upload and process the CSV file
    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        // Parse CSV using PapaParse
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const jsonData = results.data;

                // Group and process data by station and hour
                const groupedData = jsonData.reduce((acc, row) => {
                    const ptCode = row.PT_CODE;
                    const hour = parseInt(row.TIME_PER_HOUR, 10);
                    const totalVolume = parseInt(row.TOTAL_TAP_IN_VOLUME) + parseInt(row.TOTAL_TAP_OUT_VOLUME);

                    if (!acc[ptCode]) {
                        acc[ptCode] = {
                            PT_CODE: ptCode,
                            hourlyData: Array(19).fill(0), // To store data for each hour from 5 to 23
                            TOTAL_VOLUME: 0,
                        };
                    }

                    // Update hourly data and total volume
                    if (hour >= 5 && hour <= 23) {
                        acc[ptCode].hourlyData[hour - 5] += totalVolume;
                    }
                    acc[ptCode].TOTAL_VOLUME += totalVolume;

                    return acc;
                }, {});

                // Convert the grouped data back to an array and sort by total volume
                const stationArray = Object.values(groupedData);
                const sortedStations = stationArray.sort((a, b) => b.TOTAL_VOLUME - a.TOTAL_VOLUME);

                // Get the top 10 stations
                const topStations = sortedStations.slice(0, 10);
                setStations(topStations);
            },
            error: (error) => {
                console.error("Error parsing CSV file:", error);
            },
        });
    };

    // Function to get station name by PT_CODE, handling combined codes
    const getStationName = (ptCode) => {
        const codes = ptCode.split("/");

        for (const [name, value] of Object.entries(stationsInfo)) {
            if (Array.isArray(value)) {
                for (let station of value) {
                    if (codes.includes(station.stationCode)) {
                        return name;
                    }
                }
            } else if (codes.includes(value.stationCode)) {
                return name;
            }
        }
        return "Unknown Station"; // Return a default if no match is found
    };

    // Function to prepare data for Chart.js for the current station
    const getChartData = (station) => {
        const timePerHour = Array.from({ length: 19 }, (_, i) => i + 5); // Hours from 5 to 23
        const crowdLevels = station.hourlyData; // Y-axis data

        return {
            labels: timePerHour, // X-axis (time)
            datasets: [
                {
                    label: `Crowd Level at ${station.PT_CODE}`,
                    data: crowdLevels, // Y-axis (crowd level)
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }
            ]
        };
    };

    // Function to handle navigation to the next station
    const nextStation = () => {
        if (currentStationIndex < stations.length - 1) {
            setCurrentStationIndex(currentStationIndex + 1);
        }
    };

    // Function to handle navigation to the previous station
    const previousStation = () => {
        if (currentStationIndex > 0) {
            setCurrentStationIndex(currentStationIndex - 1);
        }
    };

    return (
        <div className="statistics-page">
            <h2 className="subtitle">Upload CSV File for Testing</h2>

            {/* File input for uploading CSV */}
            <input type="file" accept=".csv" onChange={handleFileUpload} />

            {/* Chart Section */}
            {stations.length > 0 && (
                <div className="chart-section">
                    <h2 className="subtitle">
                        Crowd Level for {getStationName(stations[currentStationIndex].PT_CODE)}
                    </h2>
                    <Line data={getChartData(stations[currentStationIndex])} options={options}  />

                    {/* Navigation Buttons */}
                    <div className="navigation-buttons">
                        <button onClick={previousStation} disabled={currentStationIndex === 0}>
                            Back
                        </button>
                        <button onClick={nextStation} disabled={currentStationIndex === stations.length - 1}>
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Crowded Stations List */}
            <div className="crowded-stations-section">
                <h2 className="subtitle">Top 10 Most Crowded Stations (Sorted by Total Volume)</h2>
                <ul className="station-list">
                    {stations.length > 0 ? (
                        stations.map((station, index) => {
                            const stationName = getStationName(station.PT_CODE);
                            const stationCodes = station.PT_CODE.split("/");
                        
                            return (
                                <li key={index} className="station-item">
                                    <div className="station-details">
                                        <span className="station-name">{stationName}</span>
                                        <div className="station-codes">
                                            {stationCodes.map((code, i) => (
                                                <span key={i} className={`station-code ${code.substring(0, 2)}`}>
                                                    {code}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    ) : (
                        <li>No data available. Upload a valid CSV file.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default StatisticsUI;
