// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import './styles.css';

// const StatisticsUI = () => {
//     const [stations, setStations] = useState([]);

//     useEffect(() => {
//         const fetchAndProcessExcel = async () => {
//             try {
//                 // Fetch the Excel file from the API
//                 const response = await axios.get('https://cors-anywhere.herokuapp.com/https://datamall2.mytransport.sg/ltaodataservice/PV/Train?Date=202409', {
//                     headers: {
//                         'AccountKey': 'fI9eYMuuS8ufXqQOI7wdFA==',
//                         'Accept': 'application/json'
//                     }
//                 });
                

//                 // Parse the Excel file using XLSX
//                 const workbook = XLSX.read(response.data, { type: 'buffer' });
//                 const sheetName = workbook.SheetNames[0];
//                 const sheet = workbook.Sheets[sheetName];
//                 const jsonData = XLSX.utils.sheet_to_json(sheet);

//                 // Create TOTAL_VOLUME column and group by PT_CODE
//                 const groupedData = jsonData.reduce((acc, row) => {
//                     const ptCode = row.PT_CODE;
//                     const totalVolume = row.TOTAL_TAP_IN_VOLUME + row.TOTAL_TAP_OUT_VOLUME;

//                     // Check if the station (PT_CODE) already exists in the accumulator
//                     if (acc[ptCode]) {
//                         acc[ptCode].TOTAL_VOLUME += totalVolume; // Aggregate the total volume
//                     } else {
//                         acc[ptCode] = {
//                             PT_CODE: ptCode,
//                             TOTAL_VOLUME: totalVolume,
//                         };
//                     }

//                     return acc;
//                 }, {});

//                 // Convert grouped data back to an array
//                 const stationArray = Object.values(groupedData);

//                 // Sort by TOTAL_VOLUME in descending order
//                 const sortedStations = stationArray.sort((a, b) => b.TOTAL_VOLUME - a.TOTAL_VOLUME);

//                 // Get top 10 most crowded stations
//                 const topStations = sortedStations.slice(0, 10);

//                 // Set the stations state for rendering
//                 setStations(topStations);
//             } catch (error) {
//                 console.error('Error fetching or processing Excel file:', error);
//             }
//         };

//         fetchAndProcessExcel();
//     }, []);

//     return (
//         <div className="statistics-page">            
//             <div className="graph-section">
//                 <h2 className="subtitle">Periodic statistical analysis of crowd density data</h2>
//                 <div className="graph-container">
//                     {/* Placeholder for the graph */}
//                     <canvas id="crowdDensityGraph"></canvas>
//                 </div>
//                 <div className="download-buttons">
//                     <button className="download-btn pdf">Download as PDF</button>
//                     <button className="download-btn csv">Download as CSV</button>
//                     <button className="download-btn xml">Download as XML</button>
//                 </div>
//             </div>

//             <div className="crowded-stations-section">
//                 <h2 className="subtitle">Top 10 Most Crowded Stations (Sorted by Total Volume)</h2>
//                 <ul className="station-list">
//                     {stations.length > 0 ? (
//                         stations.map((station, index) => (
//                             <li key={index} className="station-item">
//                                 {index + 1}. <span className="station-code">{station.PT_CODE}</span>
//                                 <br />
//                                 <strong>Total Volume:</strong> {station.TOTAL_VOLUME.toLocaleString()}
//                             </li>
//                         ))
//                     ) : (
//                         <li>Loading...</li>
//                     )}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default StatisticsUI;

import React, { useState } from "react";
import Papa from "papaparse"; // Importing PapaParse for CSV parsing
import './styles.css';

const StatisticsUI = () => {
    const [stations, setStations] = useState([]);

    // Function to handle file upload and process the CSV file
    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        // Parse CSV using PapaParse
        Papa.parse(file, {
            header: true, // This ensures the first row is treated as headers
            skipEmptyLines: true, // Skip empty lines in the CSV
            complete: (results) => {
                const jsonData = results.data; // Parsed CSV data as JSON

                // Process and manipulate the data
                const groupedData = jsonData.reduce((acc, row) => {
                    const ptCode = row.PT_CODE;
                    const totalVolume = parseInt(row.TOTAL_TAP_IN_VOLUME) + parseInt(row.TOTAL_TAP_OUT_VOLUME);

                    if (acc[ptCode]) {
                        acc[ptCode].TOTAL_VOLUME += totalVolume;
                    } else {
                        acc[ptCode] = {
                            PT_CODE: ptCode,
                            TOTAL_VOLUME: totalVolume,
                        };
                    }
                    return acc;
                }, {});

                // Convert grouped data back to an array and sort by total volume
                const stationArray = Object.values(groupedData);
                const sortedStations = stationArray.sort((a, b) => b.TOTAL_VOLUME - a.TOTAL_VOLUME);

                // Get top 10 stations
                const topStations = sortedStations.slice(0, 10);
                setStations(topStations);
            },
            error: (error) => {
                console.error("Error parsing CSV file:", error);
            },
        });
    };

    return (
        <div className="statistics-page">
            <h2 className="subtitle">Upload CSV File for Testing</h2>

            {/* File input for uploading CSV */}
            <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
            />

            <div className="crowded-stations-section">
                <h2 className="subtitle">Top 10 Most Crowded Stations (Sorted by Total Volume)</h2>
                <ul className="station-list">
                    {stations.length > 0 ? (
                        stations.map((station, index) => (
                            <li key={index} className="station-item">
                                {index + 1}. <span className="station-code">{station.PT_CODE}</span>
                                <br />
                                <strong>Total Volume:</strong> {station.TOTAL_VOLUME.toLocaleString()}
                            </li>
                        ))
                    ) : (
                        <li>No data available. Upload a valid CSV file.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default StatisticsUI;
