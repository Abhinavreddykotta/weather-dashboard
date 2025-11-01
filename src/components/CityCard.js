import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export default function CityCard({ city, data, onToggleFav, isFav }){
  const curr = data ? data.current : null;
  return (
    <div className={classNames('card',{loading: !data})}>
      <div className="card-header">
        <h3>{city}</h3>
        <button onClick={onToggleFav}>{isFav ? '★' : '☆'}</button>
      </div>
      {curr ? (
        <div className="card-body">
          <div className="temp">{Math.round(curr.temp_c)}°C</div>
          <div className="cond">
            <img src={curr.condition.icon} alt={curr.condition.text} />
            <div>{curr.condition.text}</div>
          </div>
          <div className="meta">
            <div>Humidity: {curr.humidity}%</div>
            <div>Wind: {curr.wind_kph} kph</div>
            <div>Pressure: {curr.pressure_mb} mb</div>
          </div>
          <div className="detail-link">
            <Link to={`/city/${encodeURIComponent(city)}`}>Details →</Link>
          </div>
        </div>
      ) : <div className="placeholder">Loading...</div>}
    </div>
  );
}
