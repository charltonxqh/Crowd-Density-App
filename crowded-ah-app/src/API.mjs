import axios from "axios";
const AccountKey = 'rgOwUkNtQCSXQMg9MhAfkw==';
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

        // Check if there is a disruption
        if (data.Status === 2) {
            // Structure the alert data
            const alertData = {
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

            return alertData;
        } else {
            // If no disruptions, return a smooth commute message
            return { status: data.Status, message: 'All train services are running smoothly.' };
        }
    } catch (error) {
        console.error('Error fetching train service alerts:', error);
        return { error: error.message };
    }
}

export async function fetchStatisticsLinkAPI() {
    const url = 'https://datamall2.mytransport.sg/ltaodataservice/PV/Train';
    try {
        const response = await axios.get(url, {
            headers: {
                'AccountKey': AccountKey,
                'Accept': 'application/json',
            },
        });

        console.log("Full API Response:", response.data); // Log the full response for debugging

        // Extract the link from the response
        if (response.data && response.data.value && Array.isArray(response.data.value) && response.data.value[0] && response.data.value[0].Link) {
            return response.data.value[0].Link; // Return the download link
        } else {
            throw new Error('No link found in the API response');
        }
    } catch (error) {
        console.error('Error fetching statistics link:', error.response ? error.response.data : error.message);
        return { error: error.message };
    }
}
