import axios from 'axios';

const BASE = process.env.REACT_APP_WEATHER_BASE || 'https://api.weatherapi.com/v1';
const KEY = process.env.REACT_APP_WEATHER_API_KEY || '';

const client = axios.create({ baseURL: BASE, timeout: 10000 });

const getForecast = async (q) => {
  
  const res = await client.get('/forecast.json', {
    params: { key: KEY, q, days: 7, aqi: 'no', alerts: 'no' }
  });
  return res.data;
};

const search = async (q) => {
  const res = await client.get('/search.json', { params: { key: KEY, q } });
  return res.data;
};

export default { getForecast, search };
