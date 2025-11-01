import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CityDetail from './components/CityDetail';
import Settings from './components/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { loadFavorites } from './slices/favoritesSlice';
import AuthButton from './components/AuthButton';

export default function App(){
  const dispatch = useDispatch();
  useEffect(()=>{ dispatch(loadFavorites()); }, [dispatch]);

  const weatherEntities = useSelector(s => s.weather.entities);
  const favorites = useSelector(s => s.favorites.items);
  const pickCity = (favorites && favorites.length>0) ? favorites[0] : 'Hyderabad';
  const entry = Object.values(weatherEntities).find(o => o.location && o.location.name && ((favorites && favorites.length>0 && o.location.name.toLowerCase()===favorites[0].toLowerCase()) || o.location.name.toLowerCase()===pickCity.toLowerCase()));
  let themeClass = '';
  if(entry && entry.current && entry.current.condition && entry.current.condition.text){
    const text = entry.current.condition.text.toLowerCase();
    if(text.includes('rain') || text.includes('drizzle') || text.includes('thunder')) themeClass = 'weather-rain';
    else if(text.includes('snow') || text.includes('sleet') || text.includes('blizzard')) themeClass = 'weather-snow';
    else if(text.includes('clear') || text.includes('sun') || text.includes('sunny')) themeClass = 'weather-sunny';
    else if(text.includes('cloud') || text.includes('overcast') || text.includes('fog') || text.includes('mist')) themeClass = 'weather-cloudy';
    else themeClass = 'weather-default';
  }

  return (
    <div className={`app ${themeClass}`}>
      <header className="app-header">
        <h1><Link to="/">Weather Analytics Dashboard</Link></h1>
        <nav style={{display:'flex', gap:12, alignItems:'center'}}>
          <Link to="/settings">Settings</Link>
          <AuthButton />
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/city/:q" element={<CityDetail />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>

      <div className="sky-decor" aria-hidden="true">
        <div className="sun"></div>
        <div className="cloud"></div>
      </div>
    </div>
  );
}
