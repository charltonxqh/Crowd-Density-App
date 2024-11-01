import React, { useState, useEffect } from "react";
import Papa from "papaparse"; // CSV parsing library
import stationsInfo from "../stationsInfo.json"; // Importing the stations info JSON file
import axios from "axios";
import JSZip from "jszip"; // Library for extracting ZIP files
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import "./styles.css";

const StatisticsUI = () => {
    const [stations, setStations] = useState([]); // State to store top 10 stations
    const [currentStationIndex, setCurrentStationIndex] = useState(0); // To track which station is displayed in the graph

    useEffect(() => {
        // Fetch and process the CSV file when the component mounts
        fetchAndProcessCSV();
    }, []);

    const fetchAndProcessCSV = async () => {
        try {
            // Step 1: Fetch the download link from your backend API
            const response = await axios.get("http://localhost:4000/api/statistics-link");
            const csvUrl = response.data.link;
            console.log("CSV Download Link:", csvUrl);

            // Step 2: Use the backend proxy to download the ZIP file
            const proxyResponse = await axios.get(
                `http://localhost:4000/api/proxy-download?url=${encodeURIComponent(csvUrl)}`,
                { responseType: "arraybuffer" }
            );

            // Step 3: Extract the CSV file using JSZip
            const zip = await JSZip.loadAsync(proxyResponse.data);
            const csvFileName = "transport_node_train_202409.csv"; // Ensure this is the correct file name
            const csvContent = await zip.file(csvFileName).async("string");

            // Step 4: Parse the CSV content using PapaParse
            Papa.parse(csvContent, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    console.log("Parsed CSV Data:", results.data);
                    const jsonData = results.data;

                    // Group and process data by station and hour
                    const groupedData = jsonData.reduce((acc, row) => {
                        const ptCode = row.PT_CODE;
                        const hour = parseInt(row.TIME_PER_HOUR, 10);
                        const totalVolume =
                            parseInt(row.TOTAL_TAP_IN_VOLUME) + parseInt(row.TOTAL_TAP_OUT_VOLUME);

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
                    const sortedStations = stationArray.sort(
                        (a, b) => b.TOTAL_VOLUME - a.TOTAL_VOLUME
                    );

                    // Get the top 10 stations
                    const topStations = sortedStations.slice(0, 10);
                    setStations(topStations);
                },
                error: (error) => {
                    console.error("Error parsing CSV file:", error);
                },
            });
        } catch (error) {
            console.error("Error fetching or extracting the CSV file:", error);
            alert("Failed to fetch or process the CSV file. Please try again later.");
        }
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

    // Prepare data for Recharts
    const getChartData = (station) => {
        const timePerHour = Array.from({ length: 19 }, (_, i) => i + 5); // Hours from 5 to 23
        return timePerHour.map((hour, index) => ({
            hour,
            crowdLevel: station.hourlyData[index],
        }));
    };

    // Navigation functions
    const nextStation = () => {
        if (currentStationIndex < stations.length - 1) {
            setCurrentStationIndex(currentStationIndex + 1);
        }
    };

    const previousStation = () => {
        if (currentStationIndex > 0) {
            setCurrentStationIndex(currentStationIndex - 1);
        }
    };

    return (
        <div className="statistics-page">
            {stations.length > 0 && (
                <div className="chart-section">
                    <h2 className="subtitle">
                        Crowd Level for {getStationName(stations[currentStationIndex]?.PT_CODE)}
                    </h2>
                    <LineChart
                        width={800}
                        height={400}
                        data={getChartData(stations[currentStationIndex])}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" label={{ value: "Hour", position: "insideBottom" }} />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="crowdLevel" stroke="#8884d8" />
                    </LineChart>
                    <div className="navigation-buttons">
                        <button onClick={previousStation} disabled={currentStationIndex === 0}>
                            Back
                        </button>
                        <button
                            onClick={nextStation}
                            disabled={currentStationIndex === stations.length - 1}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
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
                        <li>No data available. Please wait while the data loads.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default StatisticsUI;


