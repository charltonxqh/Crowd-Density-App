import React, { useState, useEffect } from "react";
import Papa from "papaparse"; 
import stationsInfo from "../stationsInfo.json"; 
import axios from "axios";
import JSZip from "jszip"; 
import { LineChart, Line, XAxis, Tooltip, CartesianGrid } from "recharts";
import "./styles.css";

const StatisticsUI = () => {
    const [stations, setStations] = useState([]); 
    const [currentStationIndex, setCurrentStationIndex] = useState(0);

    useEffect(() => {
        fetchAndProcessLocalCSV(); 
        // Uncomment the next line to use the API fetch
        // fetchAndProcessCSV();
    }, []);

    // Local CSV fetch
    const fetchAndProcessLocalCSV = async () => {
        try {
            const csvUrl = process.env.PUBLIC_URL + "/train_volume_fromAPI.csv";
            const response = await fetch(csvUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch CSV file: ${response.statusText}`);
            }

            const csvContent = await response.text();
            Papa.parse(csvContent, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const jsonData = results.data;
                    processCSVData(jsonData);
                },
                error: (error) => console.error("Error parsing CSV file:", error),
            });
        } catch (error) {
            console.error("Error fetching or processing the CSV file:", error);
        }
    };

    // API CSV fetch
    const fetchAndProcessCSV = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/statistics-link");
            const csvUrl = response.data.link;
            const proxyResponse = await axios.get(
                `http://localhost:4000/api/proxy-download?url=${encodeURIComponent(csvUrl)}`,
                { responseType: "arraybuffer" }
            );

            const zip = await JSZip.loadAsync(proxyResponse.data);
            const csvFileName = "transport_node_train_202409.csv";
            const csvContent = await zip.file(csvFileName).async("string");

            Papa.parse(csvContent, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const jsonData = results.data;
                    processCSVData(jsonData);
                },
                error: (error) => console.error("Error parsing CSV file:", error),
            });
        } catch (error) {
            console.error("Error fetching or extracting the CSV file:", error);
        }
    };

    const processCSVData = (jsonData) => {
        const groupedData = jsonData.reduce((acc, row) => {
            const ptCode = row.PT_CODE;
            const hour = parseInt(row.TIME_PER_HOUR, 10);
            const totalVolume =
                parseInt(row.TOTAL_TAP_IN_VOLUME) + parseInt(row.TOTAL_TAP_OUT_VOLUME);

            if (!acc[ptCode]) {
                acc[ptCode] = {
                    PT_CODE: ptCode,
                    hourlyData: Array(19).fill(0),
                    TOTAL_VOLUME: 0,
                };
            }

            if (hour >= 5 && hour <= 23) {
                acc[ptCode].hourlyData[hour - 5] += totalVolume;
            }
            acc[ptCode].TOTAL_VOLUME += totalVolume;
            return acc;
        }, {});

        const sortedStations = Object.values(groupedData).sort(
            (a, b) => b.TOTAL_VOLUME - a.TOTAL_VOLUME
        );

        setStations(sortedStations.slice(0, 10));
    };

    const getStationName = (ptCode) => {
        const codes = ptCode.split("/");
        for (const [name, value] of Object.entries(stationsInfo)) {
            if (Array.isArray(value)) {
                if (value.some(station => codes.includes(station.stationCode))) {
                    return name;
                }
            } else if (codes.includes(value.stationCode)) {
                return name;
            }
        }
        return "Unknown Station";
    };

    const getChartData = (station) => {
        const timePerHour = Array.from({ length: 19 }, (_, i) => i + 5);
        return timePerHour.map((hour, index) => ({
            hour,
            crowdLevel: station.hourlyData[index],
        }));
    };

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
        <div className="chart-section-wrapper">
            <div className="chart-container">
                <h2 className="subtitle">
                    Crowd Level for {getStationName(stations[currentStationIndex]?.PT_CODE)}
                </h2>
                <LineChart
                    width={700}
                    height={400}
                    data={getChartData(stations[currentStationIndex])}
                    margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="hour" 
                        label={{ value: "Time of Day", position: "insideBottom", dy: 20, style: { fontSize: 16, fill: "#333" } }} 
                    />
                    <Tooltip />
                    <Line type="monotone" dataKey="crowdLevel" stroke="#8884d8" />
                </LineChart>
            </div>
            <div className="navigation-buttons">
                <button 
                    className="navigation-button left-button" 
                    onClick={previousStation} 
                    disabled={currentStationIndex === 0}
                >
                    Back
                </button>
                <button 
                    className="navigation-button right-button" 
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
            {stations.map((station, index) => (
                <li key={index} className="station-item">
                    <div className="station-details">
                        <span className="station-rank">{index + 1}.</span>
                        <span className="station-name">
                            {getStationName(station.PT_CODE)}
                        </span>
                        <div className="station-codes">
                            {station.PT_CODE.split("/").map((code, i) => (
                                <span key={i} className={`station-code ${code.substring(0, 2)}`}>
                                    {code}
                                </span>
                            ))}
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
</div>

    );
};

export default StatisticsUI;





