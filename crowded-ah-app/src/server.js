import express from 'express';
import cors from 'cors';
import { fetchTrainLineData, TRAIN_LINES } from './API.js';
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let storedData = {};

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

// Schedule data fetching every 10 minutes
setInterval(fetchAllTrainLinesData, 10 * 60 * 1000);
fetchAllTrainLinesData();

// API route to get train data
app.get('/api/train-data', (req, res) => {
    res.json(storedData);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
