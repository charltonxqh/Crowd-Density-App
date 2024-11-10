/**
 * @fileoverview This module provides functions to fetch real-time and forecast crowd density level data, and alert data for Singapore MRT train lines, using the LTA DataMall API.
 * @author Liaw Rui Xian
 */
import axios from "axios";
const AccountKey = 'WEhOzlOxTc6U8LiCU6r6bw=='; //this is used
/* API keys to test (please delete after use)
YRSSx5QWRXO3OR1aGilhNQ==
*/

export const TRAIN_LINES = ['CCL', 'CEL', 'CGL', 'DTL', 'EWL', 'NEL', 'NSL', 'BPL', 'SLRT', 'PLRT'];

/**
 * Fetches real-time crowd density level data for a specified train line.
 * @async
 * @param {string} url - The API endpoint URL.
 * @param {string} trainLine - The train line code.
 * @returns {Promise<Object>} A promise that resolves to an object containing the real time data for each station
 */
export async function fetchRealTimeAPIData(url, trainLine) {
    try {
        const response = await axios.get(url, {
            headers: {
                'AccountKey': AccountKey,
                'Accept': 'application/json'
            },
            params: { TrainLine: trainLine }
        });

        const lineData = {
            TrainLine: trainLine,
            Stations: {}
        };

        response.data.value.forEach(station => {
            lineData.Stations[station.Station] = { CrowdLevel: station.CrowdLevel };
        });

        return lineData;

    } catch (error) {
        console.error(`Error fetching data from ${url} for ${trainLine}:`, error.response ? error.response.data : error.message);
        return { TrainLine: trainLine, error: error.message };
    }
}

/**
 * Fetches forecasted crowd density level data for a specified train line.
 * @async
 * @param {string} url - The API endpoint URL.
 * @param {string} trainLine - The train line code.
 * @returns {Promise<Object>} A promise that resolves to an object containing the forecast data for each station with crowd levels at specific intervals.
 */
export async function fetchForecastAPIData(url, trainLine) {
    try {
        const response = await axios.get(url, {
            headers: {
                'AccountKey': AccountKey,
                'Accept': 'application/json'
            },
            params: {
                TrainLine: trainLine
            }
        });

        if (!response.data || !response.data.value) {
            console.error("Unexpected API response structure:", response.data);
            return { error: "No forecast data available or unexpected response structure." };
        }

        const lineData = {
            TrainLine: trainLine,
            Stations: {}
        };

        response.data.value.forEach((dayData) => {
            dayData.Stations.forEach((station) => {
                if (!lineData.Stations[station.Station]) {
                    lineData.Stations[station.Station] = [];
                }
                
                station.Interval.forEach((interval) => {
                    lineData.Stations[station.Station].push({
                        Start: interval.Start,
                        CrowdLevel: interval.CrowdLevel
                    });
                });
            });
        });

        return lineData;

    } catch (error) {
        console.error(`Error fetching forecast data for ${trainLine}:`, error.response ? error.response.data : error.message);
        return { error: error.message };
    }
}

/**
 * Fetches train service alerts, such as disruptions and affected segments.
 * @async
 * @returns {Promise<Object>} A promise that resolves to an object containing the train service status and affected segments, if any.
 */
export async function fetchTrainServiceAlerts() {
    const url = 'https://datamall2.mytransport.sg/ltaodataservice/TrainServiceAlerts';
    try {
        const response = await axios.get(url, {
            headers: {
                'AccountKey': AccountKey,
                'Accept': 'application/json'
            }
        });

        const data = response.data.value;
        if (data.Status === 2) {
            return {
                status: data.Status,
                affectedSegments: data.AffectedSegments.map(segment => ({
                    line: segment.Line,
                    direction: segment.Direction,
                    stations: segment.Stations,
                    freePublicBus: segment.FreePublicBus,
                    freeMRTShuttle: segment.FreeMRTShuttle,
                    MRTShuttleDirection: segment.MRTShuttleDirection
                })),
                messages: data.Message.map(msg => ({
                    content: msg.Content,
                    createdDate: msg.CreatedDate
                }))
            };
        } else {
            return { status: data.Status, message: 'All train services are running smoothly.' };
        }

    } catch (error) {
        console.error('Error fetching train service alerts:', error);
        return { error: error.message };
    }
}

/**
 * Fetches a link to train statistics data.
 * @async
 * @returns {Promise<Object|string>} A promise that resolves to the statistics link if available, or an error message.
 */
export async function fetchStatisticsLinkAPI() {
    const url = 'https://datamall2.mytransport.sg/ltaodataservice/PV/Train';
    try {
        const response = await axios.get(url, {
            headers: {
                'AccountKey': AccountKey,
                'Accept': 'application/json',
            },
        });

        console.log("Full API Response:", response.data);

        if (response.data && response.data.value && Array.isArray(response.data.value) && response.data.value[0] && response.data.value[0].Link) {
            return response.data.value[0].Link; 
        } else {
            throw new Error('No link found in the API response');
        }
    } catch (error) {
        console.error('Error fetching statistics link:', error.response ? error.response.data : error.message);
        return { error: error.message };
    }
}
