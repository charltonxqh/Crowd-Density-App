import express from 'express';
import cors from 'cors';
import { fetchTrainLineData, TRAIN_LINES, fetchTrainServiceAlerts } from './API.mjs';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let storedData = {};           // Train line data
let storedAlerts = {};         // Train service alerts data

async function fetchAllTrainLinesData() {
    const results = {};
    for (const trainLine of TRAIN_LINES) {
        const lineData = await fetchTrainLineData(trainLine);
        if (!lineData.error) {
            results[trainLine] = lineData.Stations;
        } else {
            results[trainLine] = { error: lineData.error };
        }
    }
    storedData = results;
    console.log('Data updated:');
    for (const [line, stations] of Object.entries(storedData)) {
        console.log(`Train Line: ${line}`);
        if (stations.error) {
            console.log(`Error: ${stations.error}`);
        } else {
            for (const [station, data] of Object.entries(stations)) {
                console.log(`Station: ${station}, Crowd Level: ${data.CrowdLevel}`);
            }
        }
    }
}

async function fetchAllTrainServiceAlerts() {
    const alertData = await fetchTrainServiceAlerts();
    storedAlerts = alertData;
    console.log('Train service alert data updated');
}

// Schedule data fetching every 10 minutes
setInterval(fetchAllTrainLinesData, 10 * 60 * 1000);
// Schedule data fetching every 1 minutes
setInterval(fetchAllTrainServiceAlerts,  60 * 1000);
   
// Initial fetch
fetchAllTrainLinesData();
fetchAllTrainServiceAlerts();

// API route to get train line data
app.get('/api/train-data', (req, res) => {
    res.json(storedData);
});

// New API route to get train service alerts
app.get('/api/train-alerts', (req, res) => {
    res.json(storedAlerts);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});