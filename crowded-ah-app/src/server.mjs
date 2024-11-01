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