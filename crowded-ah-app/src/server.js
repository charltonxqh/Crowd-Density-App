import express from 'express';
import { fetchPCDRealTime, fetchPCDForecast } from './API_controller.js';

const app = express();
const port = 4000;

app.use(express.json());

app.get('/api/pcd-realtime', async (req, res) => {
  const stationName = req.query.station;
  const data = await fetchPCDRealTime(stationName);
  res.json(data);
});

app.get('/api/pcd-forecast', async (req, res) => {
  const stationName = req.query.station;
  const data = await fetchPCDForecast(stationName);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
