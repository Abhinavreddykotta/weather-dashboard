import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentAndForecast } from '../slices/weatherSlice';
import CityCard from './CityCard';
import SearchBar from './SearchBar';
import { addFavorite, removeFavorite } from '../slices/favoritesSlice';

const DEFAULTS = ['Hyderabad','Mumbai','New York'];

export default function Dashboard(){
  const dispatch = useDispatch();
  const weather = useSelector(s=>s.weather.entities);
  const favs = useSelector(s=>s.favorites.items);
  const [cities, setCities] = useState(() => [...DEFAULTS, ...favs]);

  useEffect(()=>{
    const unique = Array.from(new Set([...DEFAULTS, ...favs]));
    setCities(unique);
  }, [favs]);

  useEffect(()=>{
    cities.forEach(c=> dispatch(fetchCurrentAndForecast({ q: c })));
    const iv = setInterval(()=>{ cities.forEach(c=> dispatch(fetchCurrentAndForecast({ q: c }))) }, 60000);
    return ()=>clearInterval(iv);
  }, [cities, dispatch]);

  const toggleFav = (name) => {
    if(favs.includes(name)) dispatch(removeFavorite(name));
    else dispatch(addFavorite(name));
  };

  return (
    <div className="dashboard">
      <div className="top">
        <SearchBar onSelect={(q)=> setCities(prev => [q, ...prev.filter(x=>x!==q)])} />
      </div>

      <div className="cards">
        {cities.map(c=>{
          const data = Object.values(weather).find(w=>w.location && w.location.name.toLowerCase() === c.toLowerCase());
          return <CityCard key={c} city={c} data={data} onToggleFav={()=>toggleFav(c)} isFav={favs.includes(c)} />;
        })}
      </div>
    </div>
  );
}
