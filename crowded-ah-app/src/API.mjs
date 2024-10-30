import axios from "axios";
const AccountKey = 'dfC6rhhiQWm0aCPj9Yxq0w==';
export const TRAIN_LINES = ['CCL', 'CEL', 'CGL', 'DTL', 'EWL', 'NEL', 'NSL', 'BPL', 'SLRT', 'PLRT'];

export async function fetchTrainLineData(url, trainLine) {
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

        const lineData = {
            TrainLine: trainLine,
            Stations: {}
        };

        response.data.value.forEach(station => {
            lineData.Stations[station.Station] = {
                CrowdLevel: station.CrowdLevel
            };
        });

        return lineData;
        
    } catch (error) {
        console.error(`Error fetching data from ${url} for ${trainLine}:`, error);
        return {
            TrainLine: trainLine,
            error: error.message
        };
    }
}