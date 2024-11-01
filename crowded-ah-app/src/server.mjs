import express from 'express';
import cors from 'cors';
import { fetchTrainLineData, TRAIN_LINES, fetchTrainServiceAlerts, fetchStatisticsLinkAPI } from './API.mjs';
import axios from 'axios';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let storedData = {
    realTime: {},
    forecast: {}
};
let storedAlerts = {}; // Train service alerts data

// Function to fetch real-time data
async function fetchRealTimeData() {
    const results = {};
    for (const trainLine of TRAIN_LINES) {
        const lineData = await fetchTrainLineData('https://datamall2.mytransport.sg/ltaodataservice/PCDRealTime', trainLine);
        if (!lineData.error) {
            results[trainLine] = lineData.Stations;
        } else {
            results[trainLine] = { error: lineData.error };
        }
    }
    storedData.realTime = results;
    console.log('Real-time data updated:');
    for (const [line, stations] of Object.entries(storedData.realTime)) {
        console.log(`Train Line (Real-Time): ${line}`);
        if (stations.error) {
            console.log(`Error: ${stations.error}`);
        } else {
            for (const [station, data] of Object.entries(stations)) {
                console.log(`Station: ${station}, Crowd Level (Real-Time): ${data.CrowdLevel}`);
            }
        }
    }
}

// Function to fetch forecast data
async function fetchForecastData() {
    const results = {};
    for (const trainLine of TRAIN_LINES) {
        const lineData = await fetchTrainLineData('https://datamall2.mytransport.sg/ltaodataservice/PCDForecast', trainLine);
        if (!lineData.error) {
            results[trainLine] = lineData.Stations;
        } else {
            results[trainLine] = { error: lineData.error };
        }
    }
    storedData.forecast = results;
    console.log('Forecast data updated:');
    for (const [line, stations] of Object.entries(storedData.forecast)) {
        console.log(`Train Line (Forecast): ${line}`);
        if (stations.error) {
            console.log(`Error: ${stations.error}`);
        } else {
            for (const [station, data] of Object.entries(stations)) {
                console.log(`Station: ${station}, Crowd Level (Forecast): ${data.CrowdLevel}`);
            }
        }
    }
}

async function fetchAllTrainServiceAlerts() {
    const alertData = await fetchTrainServiceAlerts();
    storedAlerts = alertData;
    console.log('Train service alert data updated');
}

// Schedule real-time data fetching every 30 minutes
setInterval(fetchRealTimeData, 30 * 60 * 1000);
fetchRealTimeData();
// Schedule data fetching every 30 minutes
setInterval(fetchAllTrainServiceAlerts, 30 * 60 * 1000);
fetchAllTrainServiceAlerts();
// Schedule forecast data fetching once a day
setInterval(fetchForecastData, 24 * 60 * 60 * 1000);
fetchForecastData();
// Schedule to fetch statistics data once in a week
setInterval(fetchStatisticsLinkAPI, 7 * 24 * 60 * 60 * 1000);
fetchStatisticsLinkAPI();

// API route to get train line data
app.get('/api/train-data', (req, res) => {
    res.json(storedData);
});

// New API route to get train service alerts
app.get('/api/train-alerts', (req, res) => {
    res.json(storedAlerts);
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
