/**
 * @fileoverview 
 * This file creates an Express-based backend server for a real-time train data application. 
 * It manages data for train arrival times, real-time crowd density level, forecast  crowd density level, service alerts and monthly statistics for each train station
 * The server updates data at scheduled intervals and provide various API endpoints for a front-end client to retrieve information.

 * The server includes:
 * - API endpoints for retrieving train data, service alerts, and forecast information.
 * - A route for train arrival data by station, which executes a Python script.
 * - A route to fetch a statistics link.
 * - A proxy route for downloading files (e.g., ZIP) from external URLs.
 * - A route for retrieving forecast information for specific stations by line and code.

 * Key libraries used:  
 * - Express: Web server framework.
 * - Bottleneck: To limit the rate of API calls for forecast data to obey the API usage policy
 * - axios: To handle external HTTP requests.

 * Scheduled tasks:
 * - Real-time data is refreshed every 10 minutes.
 * - Forecast data is refreshed every 24 hours.
 * - Service alerts are refreshed every minute.
 * @author Liaw Rui Xian, Choo Yi Ken, Meagan Eng Pei Ying, Quek Jared
 */

import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import { fetchRealTimeAPIData, fetchForecastAPIData, fetchTrainServiceAlerts, TRAIN_LINES, fetchStatisticsLinkAPI } from './API.mjs';
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

const limiter = new Bottleneck({
    minTime: 1000,
    maxConcurrent: 1,
});

/**
 * Updates the real-time crowd density data for all train lines.
 * @async
 * @function
 * @returns {Promise<void>} Updates the storedData.realTime state with the fetched real-time data.
 */
async function updateRealTimeData() {
    const results = {};
    for (const line of TRAIN_LINES) {
        const data = await fetchRealTimeAPIData('https://datamall2.mytransport.sg/ltaodataservice/PCDRealTime', line);
        results[line] = data.Stations || { error: data.error };
    }
    storedData.realTime = results;
}

/**
 * Updates the forecast crowd density data for all train lines.
 * @async
 * @function
 * @returns {Promise<Object>} Updates the storedData.forecast state with the fetched forecast data.
 */
async function updateForecastData() {
    const results = {};
    for (const line of TRAIN_LINES) {
        results[line] = await limiter.schedule(() =>
            fetchForecastAPIData('https://datamall2.mytransport.sg/ltaodataservice/PCDForecast', line)
        );
    }
    storedData.forecast = results;
}

/**
 * Updates the service alerts for train lines.
 * @async
 * @function
 * @returns {Promise<void>} Updates the storedAlerts state with the fetched train service alerts.
 */
async function updateServiceAlerts() {
    storedAlerts = await fetchTrainServiceAlerts();
}

// Scheduling periodic updates
setInterval(updateRealTimeData, 10 * 60 * 1000);
setInterval(updateForecastData, 24 * 60 * 60 * 1000);
setInterval(updateServiceAlerts, 60 * 1000);
updateRealTimeData();
updateForecastData();
updateServiceAlerts();

/**
 * Route handler for fetching all train data, including real-time and forecast crowd density data.
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing the storedData object.
 */
app.get('/api/train-data', (req, res) => res.json(storedData));

/**
 * Route handler for fetching train service alerts.
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing the storedAlerts object.
 */
app.get('/api/train-alerts', (req, res) => res.json(storedAlerts));

/**
 * Route handler for fetching the train arrival time for a specific station.
 * Executes a Python script to get train arrival information.
 * @function
 * @param {Object} req - Express request object, with station name as a parameter.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with train arrival data or an error message.
 */
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

/**
 * Route handler for fetching the statistics link for train data.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing the statistics link or an error message.
 */
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

/**
 * Route handler to proxy the download of a ZIP file from an external URL.
 * @async
 * @function
 * @param {Object} req - Express request object, with URL as a query parameter.
 * @param {Object} res - Express response object.
 * @returns {Buffer} The downloaded file as an array buffer or an error message.
 */
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

/**
 * Route handler for fetching the forecast data for a specific station on a specified line.
 * @function
 * @param {Object} req - Express request object, with line and station code as parameters.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with forecast data for the specified station or an error message.
 */
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
