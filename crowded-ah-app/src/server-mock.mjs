import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { fetchTrainServiceAlerts, TRAIN_LINES } from './API.mjs';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let storedAlerts = {}
let todayForecast = {}
let storedData = { realTime: {}, forecast: {} }
// Function to load mock real-time data from JSON files
async function loadMockRealTimeData() {
    if (Object.keys(todayForecast).length === 0) {
        await loadMockForecastData();
    }
    const results = {};
    for (const line of TRAIN_LINES) {
        const filePath = path.resolve(__dirname, 'mockAPI', `mockRT-${line}.json`);
        try {
            const fileContent = await fs.readFile(filePath, 'utf8'); 
            const data = JSON.parse(fileContent);
            results[line] = data.value.length > 0 ? data.value : { error: 'No data found' };
        } catch (error) {
            console.error(`Error reading file ${filePath}:`, error);
            results[line] = { error: 'Failed to read data' };
        }
    }
    storedData.realTime = results;
    storedData.forecast = getNextClosestForecast(todayForecast);
}

async function loadMockForecastData() {
    const results = {};
    for (const line of TRAIN_LINES) {
        const filePath = path.resolve(__dirname,  'mockAPI', `mockFC-${line}.json`);
        try {
            const fileContent = await fs.readFile(filePath, 'utf8'); 
            const data = JSON.parse(fileContent);
            results[line]=data.value;
        } catch (error) {
            console.error(`Error reading file ${filePath}:`, error);
        }
    }
    todayForecast = results;
}

function getNextClosestForecast(data) {
    const now = new Date();
    const fixedDate = new Date(2024, 9, 31, now.getHours(), now.getMinutes(), now.getSeconds());
    const apiTimezoneOffset = 8 * 60 * 60 * 1000;
    const localTime = new Date(fixedDate.getTime() + apiTimezoneOffset);
    const roundedMinutes = Math.ceil(localTime.getMinutes() / 30) * 30;
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
                return filteredEntries.length > 0 ? { [stationKey]: filteredEntries } : null; 
            }).filter(Boolean);
            if (filteredStations.length > 0) {
                results[line] = filteredStations;
            }
        }
    }
    return results;
}

async function loadServiceAlerts() {
    storedAlerts = await fetchTrainServiceAlerts();
}

setInterval(loadServiceAlerts, 60 * 1000);
async function initializeData() {
    await loadMockForecastData();
    await loadMockRealTimeData();
    await loadServiceAlerts();
}
initializeData();

// API routes
app.get('/api/train-data', (req, res) => res.json(storedData));
app.get('/api/train-alerts', (req, res) => res.json(storedAlerts));
app.get('/', (req, res) => {
    res.send('Hello, world!');
});    
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


