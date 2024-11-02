import express from 'express';
import cors from 'cors';
import { exec } from 'child_process'; // Import child_process
import { fetchRealTimeAPIData, fetchForecastAPIData, fetchTrainServiceAlerts, TRAIN_LINES } from './API.mjs';
import Bottleneck from 'bottleneck';
import axios from 'axios';

const app = express();
const PORT = 4000;

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

let storedData = { realTime: {}, forecast: {} };
let storedAlerts = {};
// let todayForecast = {};

async function updateRealTimeData() {
    const results = {};
    for (const line of TRAIN_LINES) {
        const data = await fetchRealTimeAPIData('https://datamall2.mytransport.sg/ltaodataservice/PCDRealTime', line);
        results[line] = data.Stations || { error: data.error };
    }
    storedData.realTime = results;
}

const limiter = new Bottleneck({
    minTime: 1000, // Minimum time between requests (1 second)
    maxConcurrent: 1, // Only 1 request at a time
});

// Function to fetch forecast data
// async function fetchForecastData() {
//     const results = {};
//     for (const trainLine of TRAIN_LINES) {
//         const lineData = await fetchTrainLineData('https://datamall2.mytransport.sg/ltaodataservice/PCDForecast', trainLine);
//         if (!lineData.error) {
//             results[trainLine] = lineData.Stations;
//         } else {
//             results[trainLine] = { error: lineData.error };
//         }
//     }
//     storedData.forecast = results;
//     console.log('Forecast data updated:');
//     for (const [line, stations] of Object.entries(storedData.forecast)) {
//         console.log(`Train Line (Forecast): ${line}`);
//         if (stations.error) {
//             console.log(`Error: ${stations.error}`);
//         } else {
//             for (const [station, data] of Object.entries(stations)) {
//                 console.log(`Station: ${station}, Crowd Level (Forecast): ${data.CrowdLevel}`);
//             }
//         }
//     }
// }

// async function fetchAllTrainServiceAlerts() {
//     const alertData = await fetchTrainServiceAlerts();
//     storedAlerts = alertData;
//     console.log('Train service alert data updated');
// }

//    Schedule real-time data fetching every 30 minutes
//     setInterval(fetchRealTimeData, 30 * 60 * 1000);
// //  fetchRealTimeData();
// //  Schedule data fetching every 30 minutes
//     setInterval(fetchAllTrainServiceAlerts, 30 * 60 * 1000);
//     fetchAllTrainServiceAlerts();
//     Schedule forecast data fetching once a day
//     setInterval(fetchForecastData, 24 * 60 * 60 * 1000);
//     fetchForecastData();
//     Schedule to fetch statistics data once in a week
//     setInterval(fetchStatisticsLinkAPI, 7 * 24 * 60 * 60 * 1000);
//     fetchStatisticsLinkAPI();

// API route to get train line data
// app.get('/api/train-data', (req, res) => {
//     res.json(storedData);
// });

    async function updateForecastData() {
        const forecastResults = {};

        for (const line of TRAIN_LINES) {
            forecastResults[line] = await limiter.schedule(() =>
                fetchForecastAPIData('https://datamall2.mytransport.sg/ltaodataservice/PCDForecast', line)
            );
        }
        storedData.forecast = forecastResults;
        console.log('Forecast data updated');
    }


    // async function updateForecastData() {
    //     const results = {};
    //     for (const line of TRAIN_LINES) {
    //         results[line] = await limiter.schedule(() =>
    //             fetchForecastAPIData('https://datamall2.mytransport.sg/ltaodataservice/PCDForecast', line)
    //         );
    //     }
    //     todayForecast = results;
    // }

    async function updateServiceAlerts() {
        storedAlerts = await fetchTrainServiceAlerts();
    }

// Schedule and initialize data fetching
    setInterval(updateRealTimeData, 10 * 60 * 1000);
    setInterval(updateForecastData, 24 * 60 * 60 * 1000);
    setInterval(updateServiceAlerts, 60 * 1000);

    updateRealTimeData();
    updateForecastData();
    updateServiceAlerts();

// async function getNextClosestForecast(data) {
//     if(todayForecast.empty()){
//         await updateForecastData();
//     }
//     const now = new Date();
//     const localTime = new Date(now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
//     const apiTimezoneOffset = new Date(localTime.getTime() + 8* 60 * 60 * 1000);
//     const roundedMinutes = Math.ceil(apiTimezoneOffset.getMinutes() / 30) * 30;
//     const nextTime = new Date(localTime);
//     nextTime.setMinutes(roundedMinutes);
//     nextTime.setSeconds(0);

//     if (roundedMinutes === 60) {
//         nextTime.setMinutes(0);
//         nextTime.setHours(nextTime.getHours() + 1);
//     }
//     let results = {}
//     const nextTimeString = nextTime.toISOString().slice(0, 19).concat('+08:00');
//     for (const line of TRAIN_LINES) {
//         if (data[line]) {
//             const filteredStations = data[line].map(station => {
//                 const stationKey = Object.keys(station)[0];
//                 const filteredEntries = station[stationKey].filter(entry => entry.Start === nextTimeString);
//                 return filteredEntries.length > 0 ? { [stationKey]: filteredEntries } : null; // Keep only if there are matching entries
//             }).filter(Boolean);
//             if (filteredStations.length > 0) {
//                 results[line] = filteredStations;
//             }
//         }
//     }
//     storedData.forecast = results;
// }

// Schedule and initialize data fetching
// setInterval(updateForecastData, 24 * 60 * 60 * 1000);
// setInterval(updateRealTimeData, 10 * 60 * 1000);
// setInterval(getNextClosestForecast, 10 * 60 * 60 * 1000);
// setInterval(updateServiceAlerts, 60 * 1000);

// updateRealTimeData();
// updateForecastData();
// getNextClosestForecast(todayForecast);
// updateServiceAlerts();

// API routes
app.get('/api/train-data', (req, res) => res.json(storedData));
app.get('/api/train-alerts', (req, res) => res.json(storedAlerts));
app.get('/api/train-arrival/:stationName', (req, res) => {
    const stationName = req.params.stationName;
    exec(`python backend/call_train_arrival.py "${stationName}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${stderr}`);
            return res.status(500).json({ error: 'Error fetching train arrival data' });
        }
    
        console.log("Python script output:", stdout); // Log the output from the Python script
        try {
            const arrivalData = JSON.parse(stdout);
            console.log("Arrival data fetched:", arrivalData); // Log the parsed data for debugging
            res.json(arrivalData); // Send the data as a JSON response
        } catch (parseError) {
            console.error(`Error parsing JSON: ${parseError}`);
            res.status(500).json({ error: 'Error parsing arrival data' });
        }
    });
    
});

// API route to get the statistics link
app.get('/api/statistics-link', async (req, res) => {
    try {
        const link = await fetchStatisticsLinkAPI();
        if (link.error) {
            res.status(500).json({ error: link.error });
        } else {
            res.json({ link });
        }
    } catch (error) {
        console.error('Error fetching statistics link:', error);
        res.status(500).json({ error: 'An error occurred while fetching the statistics link' });
    }
});

// New API route to proxy the ZIP file download
app.get('/api/proxy-download', async (req, res) => {
    const { url } = req.query; // Get the URL from the query parameters

    if (!url) {
        return res.status(400).json({ error: "No URL provided" });
    }

    try {
        // Fetch the file from the external URL
        const response = await axios.get(url, { responseType: 'arraybuffer' });

        // Set the appropriate headers and send the data
        res.setHeader('Content-Type', response.headers['content-type']);
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).json({ error: 'Error fetching file' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
