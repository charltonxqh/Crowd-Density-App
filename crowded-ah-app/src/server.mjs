import express from 'express';
import cors from 'cors';
import { exec } from 'child_process'; // Import child_process
import { fetchRealTimeAPIData, fetchForecastAPIData, fetchTrainServiceAlerts, TRAIN_LINES } from './API.mjs';
import Bottleneck from 'bottleneck';

const app = express();
const PORT = 4000;

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

let storedData = { realTime: {}, forecast: {} };
let storedAlerts = {};
let todayForecast = {};

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

async function updateForecastData() {
    const results = {};
    for (const line of TRAIN_LINES) {
        results[line] = await limiter.schedule(() =>
            fetchForecastAPIData('https://datamall2.mytransport.sg/ltaodataservice/PCDForecast', line)
        );
    }
    todayForecast = results;
}


async function updateServiceAlerts() {
    storedAlerts = await fetchTrainServiceAlerts();
}

async function getNextClosestForecast(data) {
    if(todayForecast.empty()){
        await updateForecastData();
    }
    const now = new Date();
    const localTime = new Date(now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
    const apiTimezoneOffset = new Date(localTime.getTime() + 8* 60 * 60 * 1000);
    const roundedMinutes = Math.ceil(apiTimezoneOffset.getMinutes() / 30) * 30;
    const nextTime = new Date(localTime);
    nextTime.setMinutes(roundedMinutes);
    nextTime.setSeconds(0);

    if (roundedMinutes === 60) {
        nextTime.setMinutes(0);
        nextTime.setHours(nextTime.getHours() + 1);
    }
    let results = {}
    const nextTimeString = nextTime.toISOString().slice(0, 19).concat('+08:00');
    for (const line of TRAIN_LINES) {
        if (data[line]) {
            const filteredStations = data[line].map(station => {
                const stationKey = Object.keys(station)[0];
                const filteredEntries = station[stationKey].filter(entry => entry.Start === nextTimeString);
                return filteredEntries.length > 0 ? { [stationKey]: filteredEntries } : null; // Keep only if there are matching entries
            }).filter(Boolean);
            if (filteredStations.length > 0) {
                results[line] = filteredStations;
            }
        }
    }
    storedData.forecast = results;
}

// Schedule and initialize data fetching
setInterval(updateForecastData, 24 * 60 * 60 * 1000);
setInterval(updateRealTimeData, 10 * 60 * 1000);
setInterval(getNextClosestForecast, 10 * 60 * 60 * 1000);
setInterval(updateServiceAlerts, 60 * 1000);

updateRealTimeData();
updateForecastData();
getNextClosestForecast(todayForecast);
updateServiceAlerts();

// API routes
app.get('/api/train-data', (req, res) => res.json(storedData));
app.get('/api/train-alerts', (req, res) => res.json(storedAlerts));
app.get('/api/train-arrival/:stationName', (req, res) => {
    const stationName = req.params.stationName;
    // Command to run your Python script
    exec(`python src/TrainETA.py ${stationName}`, (error, stdout, stderr) => {
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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));