import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import { fetchRealTimeAPIData, fetchForecastAPIData, fetchTrainServiceAlerts, TRAIN_LINES, fetchStatisticsLinkAPI } from './API.mjs';
import Bottleneck from 'bottleneck';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = 4000;

app.use(cors({
    origin: 'http://localhost:3000'
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

let storedData = { realTime: {}, forecast: {}, todayForecast: {}};
let storedAlerts = {};

function integrateLines(data) {
    if (data.CCL && data.CEL) {
        for (const station in data.CEL) {
            data.CCL[station] = data.CEL[station];
        }
        delete data.CEL;
    }
    if (data.CGL && data.EWL) {
        for (const station in data.CGL) {
            data.EWL[station] = data.CGL[station];
        }
        delete data.CGL;
    }
    return data;
}

// Function to load mock forecast data
async function loadMockForecastData() {
    const results = {};
    for (const line of TRAIN_LINES) {
        if (line === 'CGL' || line === 'CEL') {
            continue;
        }
        const filePath = path.resolve(__dirname, 'mockAPI', `mockFC-${line}.json`);
        try {
            const fileContent = await fs.readFile(filePath, 'utf8'); 
            const data = JSON.parse(fileContent);
            results[line] = data.value;
        } catch (error) {
            console.error(`Error reading file ${filePath}:`, error);
        }
    }
    return results;
}

// Function to find the next closest forecast
async function getNextClosestForecast(data) {
    const now = new Date();
    const localOffset = 8 * 60 * 60 * 1000; // UTC+8
    const nextTime = new Date(now.getTime() + localOffset);
    nextTime.setMinutes(Math.ceil(nextTime.getMinutes() / 30) * 30);
    nextTime.setSeconds(0);
    // nextTime.setFullYear(2024);
    // nextTime.setMonth(9);
    // nextTime.setDate(32);
    if (nextTime.getMinutes() === 60) {
        nextTime.setMinutes(0);
        nextTime.setHours(nextTime.getHours() + 1);
    }
    const nextTimeString = nextTime.toISOString().slice(0, 19).concat('+08:00');
    
    // const results = {};
    // for (const line in data) {
    //     results[line] = {};
    //     for (const stationData of data[line]) {
    //         for (const station in stationData) {
    //             for (const period of stationData[station]) {
    //                 if (period.Start === nextTimeString) {
    //                     results[line][station] = {CrowdLevel: period.CrowdLevel}
    //                 }
    //             }
    //         }
    //     }
    // }
    const results = {};
    for (const line in data) {
        results[line] = {};
        const stations = data[line].Stations;
        for (const station in stations) {
            for (const period of stations[station]) {
                if (period.Start === nextTimeString) {
                    results[line][station]={CrowdLevel: period.CrowdLevel};
                }
            }
        }
    }
    storedData.forecast = storedData.todayForecast;
}

// Bottleneck limiter configuration
const limiter = new Bottleneck({
    minTime: 1000, // Minimum time between requests (1 second)
    maxConcurrent: 1, // Only 1 request at a time
});

async function updateRealTimeData() {
    const results = {};
    for (const line of TRAIN_LINES) {
        const data = await fetchRealTimeAPIData('https://datamall2.mytransport.sg/ltaodataservice/PCDRealTime', line);
        results[line] = data.Stations || { error: data.error };
    }
    storedData.realTime = results;
    storedData.realTime = integrateLines(storedData.realTime);
}

async function updateForecastData() {
    const results = {};
    for (const line of TRAIN_LINES) {
        results[line] = await limiter.schedule(() =>
            fetchForecastAPIData('https://datamall2.mytransport.sg/ltaodataservice/PCDForecast', line)
        );
    }
    storedData.forecast = results;
    storedData.forecast = integrateLines(storedData.forecast);
}

async function updateServiceAlerts() {
    storedAlerts = await fetchTrainServiceAlerts();
}

// Scheduling periodic updates
setInterval(updateRealTimeData, 10 * 60 * 1000);
//setInterval(loadMockForecastData, 24 * 60 * 60 * 1000);
setInterval(updateForecastData, 24 * 60 * 60 * 1000);
setInterval(updateServiceAlerts, 60 * 1000);
setInterval(async () => {
    storedData.forecast = await getNextClosestForecast(storedData.todayForecast);
}, 30 * 60 * 1000);

(async function initializeData() {
        updateRealTimeData();
        try {
            //todayForecast = await loadMockForecastData();
            storedData.todayForecast = await updateForecastData();
            console.log("Today's Forecast:", storedData.todayForecast);
            storedData.forecast = await getNextClosestForecast(storedData.todayForecast);
            console.log("Stored Forecast Data:", storedData.forecast);
        } catch (error) {
            console.error("Error during initialization:", error);
        }
})();
updateServiceAlerts();

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
        try {
            const arrivalData = JSON.parse(stdout);
            res.json(arrivalData);
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
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "No URL provided" });
    }

    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        res.setHeader('Content-Type', response.headers['content-type']);
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).json({ error: 'Error fetching file' });
    }
});

// Add this route to your existing routes in server.mjs
app.get('/api/station-forecast/:line/:code', (req, res) => {
    const { line, code } = req.params;
  
    // Check if forecast data for the line exists
    if (storedData.forecast[line] && storedData.forecast[line].Stations[code]) {
      return res.json(storedData.forecast[line].Stations[code]);
    }
  
    // If no forecast data is found, return an empty array
    res.status(404).json({ message: 'No forecast data available for this station.' });
  });
  

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
