import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentAndForecast } from '../slices/weatherSlice';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area, ResponsiveContainer } from 'recharts';

export default function CityDetail(){
  const { q } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(s=> s.weather.entities[q] || Object.values(s.weather.entities).find(o=>o.location && o.location.name.toLowerCase()===q.toLowerCase()));
  useEffect(()=>{ dispatch(fetchCurrentAndForecast({ q })); }, [q, dispatch]);

  if(!data) return <div>Loading...</div>;

  const hours = data.forecast.forecastday[0].hour.map(h=> ({ time: h.time.split(' ')[1], temp: h.temp_c, precip: h.chance_of_rain || h.precip_mm }) );
  const days = data.forecast.forecastday.map(d=> ({ date: d.date, maxtemp: d.day.maxtemp_c, mintemp: d.day.mintemp_c, avgtemp: d.day.avgtemp_c, precip: d.day.totalprecip_mm }) );

  return (
    <div className="city-detail">
      <h2>{data.location.name}, {data.location.country}</h2>
      <div className="stats">
        <div>Local time: {data.location.localtime}</div>
        <div>Temp: {data.current.temp_c} °C</div>
        <div>Condition: {data.current.condition.text}</div>
        <div>UV index: {data.current.uv}</div>
        <div>Dew point: {data.current.dewpoint_c ?? 'N/A'}</div>
      </div>

      <section>
        <h3>Hour-by-hour (today)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={hours}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#8884d8" />
        </LineChart>
          </ResponsiveContainer>
      </section>

      <section>
        <h3>5-7 Day Forecast</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={days}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="avgtemp" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
          </ResponsiveContainer>
      </section>
    </div>
  );
}
