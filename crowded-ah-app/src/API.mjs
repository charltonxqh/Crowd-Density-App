import axios from "axios";
const ACCOUNT_KEY = 'dfC6rhhiQWm0aCPj9Yxq0w==';
export const TRAIN_LINES = ['CCL', 'CEL', 'CGL', 'DTL', 'EWL', 'NEL', 'NSL', 'BPL', 'SLRT', 'PLRT'];

export async function fetchTrainLineData(trainLine) {
    const url = 'https://datamall2.mytransport.sg/ltaodataservice/PCDRealTime';
    try {
        const response = await axios.get(url, {
            headers: {
                'AccountKey': ACCOUNT_KEY,
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
        console.error(`Error fetching data for ${trainLine}:`, error);
        return {
            TrainLine: trainLine,
            error: error.message
        };
    }
}

