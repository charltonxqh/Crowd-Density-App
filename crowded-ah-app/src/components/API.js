const axios = require('axios');

const ACCOUNT_KEY = 'dfC6rhhiQWm0aCPj9Yxq0w==';
const TRAIN_LINES = ['CCL', 'CEL', 'CGL', 'DTL', 'EWL', 'NEL', 'NSL', 'BPL', 'SLRT', 'PLRT'];

async function fetchTrainLineData(trainLine) {
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
        console.log(`Data for ${trainLine}:`);
        console.log(response.data);
    } catch (error) {
        console.error(`Error fetching data for ${trainLine}:`, error);
    }
}

async function fetchAllTrainLinesData() {
    for (const trainLine of TRAIN_LINES) {
        await fetchTrainLineData(trainLine);
    }
}

fetchAllTrainLinesData();
