import express from 'express';
import cors from 'cors';
import { fetchTrainLineData, TRAIN_LINES } from './API.mjs';
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let storedData = {
    realTime: {},
    forecast: {}
};

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

// Schedule real-time data fetching every 10 minutes
setInterval(fetchRealTimeData, 10 * 60 * 1000);
fetchRealTimeData();

// Schedule forecast data fetching once a day
setInterval(fetchForecastData, 24 * 60 * 60 * 1000);
fetchForecastData();

// API route to get train data
app.get('/api/train-data', (req, res) => {
    res.json(storedData);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
