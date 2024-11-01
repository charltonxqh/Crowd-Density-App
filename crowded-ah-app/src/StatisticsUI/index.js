import React, { useState , useEffect } from "react";
import Papa from "papaparse"; // CSV parsing
import stationsInfo from "../stationsInfo.json"; // Importing the stations info JSON file
import { Line } from "react-chartjs-2"; // Importing Line chart from Chart.js
import Chart from "chart.js/auto"; // Required for Chart.js to work properly
import axios from "axios";
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


    useEffect(() => {
        // Fetch and process CSV file automatically when the component mounts
        fetchAndProcessCSV();
    }, []);

    // Function to fetch the downloadable CSV link and process it
    const fetchAndProcessCSV = async () => {
        try {
            // Call the API to get the downloadable link
            const response = "https://ltafarecard.s3.ap-southeast-1.amazonaws.com/202409/transport_node_train_202409.zip?X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaDmFwLXNvdXRoZWFzdC0xIkgwRgIhALhWeRgMhTuiugeP%2F1hk1kgZ70OyNN2JEmcjkjdVuH9iAiEA9cgDW3VmkSoJJSJEwtDJmKmFUEt9MYREYeYhQJf1E9sqywUIo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAEGgwzNDA2NDUzODEzMDQiDAjUUyJPhpppK8F8NyqfBXIMg07Ida5BfGZ%2FH%2Fh%2FTBLLmzg8iq6CUnIhYzUxJXgqhB5Vx5slLCea0djHJ2wDTEAVck82gTG2771tkuqBLcxCFPFgT%2FnI%2BWGiibUcr1c%2FBzMg%2BFtISk1U5GqGYBoiUy7DPEfVq3Z4qNkmIgT51SehJnpoVHEnIBJG%2FY%2BOg5dDUL%2F8%2BSdEs0gLZyc06EcAeMdEpczw30Mx19kCVINM7FfPVPC%2FXN5mBpTKCHagl9%2BLtOQiMmPiHZHCf%2Bep5utHNrVtMmPctMKVhkU0BIFk8gM%2BzqW4RipcAkZj1vZFcJtEm%2BV2I2yFzsv4aLSOo6AwrQ2aDAtx2kVsmdjQqKnkiU50Kd%2FIaq4BpXdiBAl%2F6%2FlmL2rIlgIEbb%2By2%2FfkxFJTTGLD8bdpSA%2Bn4lrcF1tuvl2J%2BRmLfWLg9e4w%2BFFAlMHLJjkcX7IaEBIHTpeYm1XSahsW5y5RDkEmw27j3vw1kuVCTd%2Bg1wp%2F3gmz9UyxFq8QmOQGgT6w0srvrmEPNHMHgN3ycWn98XP1DY31jzQl58fy0WUczuAzJZy5BkkDwkl37iof7M%2Breka8K7IwbUs8F5BSS3MJ5uDdTa8GpSjRAWkX2%2BycUsn6szmJanuI8b2odtj9Fv8ElXTy02UHYZOQGnZAyrhn%2FaMizZL4bj%2B3C5uPqslkRcKc%2BRYPSB462Vb0wb2IKHX2vjdLq1Y82E5Vw5WLH3kZ4rgjL3q3Ngw39mcwuEAIv%2BUg9VZ5nrtELmJVNOodOIsaeNTLnbmhbW2MxlEURkoh6UM0%2F5gDQJ6wUL%2BR3NYXYxJuUt8QqlAr4hDUWgJ101ImX6omY1W%2FF3hGf3YGrKdza9o9sKJEusGBJf3LI4vrjwikIQmZQR1sU21bnvhvkWISSb3PILtFh29GMLrXkrkGOrABomNT%2BlBypyB8yhXFFYHlFJkCJBFfCacc%2BtRtFVuUCR4nV4bNgDQkDIqbnrFVyWXc6shqarbOZKlJJ%2BRIuTn3yjJvxTS7HmG0e5wugYeIZo0S2Re7%2BZfSqI4mrpUYYv7exoBWWeei7CqzyFsukFiIGvqCvnO5Xc1ZjkzNyESZaECEgPEr9FT%2BweRVEeO4kWp4AxrEAZ0zviBolltuRG6q%2FVO2uIC0jR8hXEwcJpF1wnA%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241101T111944Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAU6UAMAS4DEFRM4GM%2F20241101%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=1e2b9e91cc1c88e5e74d4c480b3db7da9569cae59ce62bb3109ba8505a46f7ac"
            const csvUrl = response;
            //const response = await axios.get("http://localhost:4000/api/statistics-link");
            //const csvUrl = response.data.link;

            // Fetch the CSV content using the URL
            const csvResponse = await axios.get(csvUrl);
            const csvData = csvResponse.data;

            // Parse CSV using PapaParse
            Papa.parse(csvData, {
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
        } catch (error) {
            console.error("Error fetching statistics link:", error);
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
            {/* Chart Section */}
            {stations.length > 0 && (
                <div className="chart-section">
                    <h2 className="subtitle">
                        Crowd Level for {getStationName(stations[currentStationIndex].PT_CODE)}
                    </h2>
                    <Line data={getChartData(stations[currentStationIndex])} options={options} />
    
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
                        <li>No data available. Please wait while the data loads.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}    

export default StatisticsUI;
