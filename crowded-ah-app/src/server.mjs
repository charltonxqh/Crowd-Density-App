import express from 'express';
import cors from 'cors';
import { fetchRealTimeAPIData, fetchForecastAPIData, fetchTrainServiceAlerts, TRAIN_LINES } from './API.mjs';

const app = express();
const PORT = 4000;

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

let storedData = { realTime: {}, forecast: {} };
let storedAlerts = {};

async function updateRealTimeData() {
    const results = {};
    for (const line of TRAIN_LINES) {
        const data = await fetchRealTimeAPIData('https://datamall2.mytransport.sg/ltaodataservice/PCDRealTime', line);
        results[line] = data.Stations || { error: data.error };
    }
    storedData.realTime = results;
}

import Bottleneck from 'bottleneck';

const limiter = new Bottleneck({
    minTime: 2000, // Minimum time between requests (1 second)
    maxConcurrent: 1, // Only 1 request at a time
});

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

// API routes
app.get('/api/train-data', (req, res) => res.json(storedData));
app.get('/api/train-alerts', (req, res) => res.json(storedAlerts));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
