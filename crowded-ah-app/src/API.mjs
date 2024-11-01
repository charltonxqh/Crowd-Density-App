import axios from "axios";

const AccountKey = 'kcq4zn02Tge/ffgkOyNFFQ==';
export const TRAIN_LINES = ['CCL', 'CEL', 'CGL', 'DTL', 'EWL', 'NEL', 'NSL', 'BPL', 'SLRT', 'PLRT'];

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

export async function fetchForecastAPIData(url, trainLine) {
    try {
        const response = await axios.get(url, {
            headers: {
                'AccountKey': AccountKey,
                'Accept': 'application/json'
            },
            params: {
                TrainLine: trainLine // Include the trainLine parameter
            }
        });

        if (!response.data || !response.data.value) {
            // Log the entire response if value is missing to debug the issue
            console.error("Unexpected API response structure:", response.data);
            return { error: "No forecast data available or unexpected response structure." };
        }

        // Initialize line data with the train line and empty stations object
        const lineData = {
            TrainLine: trainLine,
            Stations: {}
        };

        // Process each station's interval data
        response.data.value.forEach((dayData) => {
            dayData.Stations.forEach((station) => {
                if (!lineData.Stations[station.Station]) {
                    lineData.Stations[station.Station] = [];
                }
                
                // Populate each station with its intervals
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

export async function fetchStationData(stationCode) {
    try {
        const response = await fetch(`http://localhost:4000/api/train-arrival/${station.name}`); // Update the endpoint if necessary
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data; // Return the fetched station data
    } catch (error) {
        console.error('Error fetching station data:', error);
        return null; // Return null or handle the error as needed
    }
};
