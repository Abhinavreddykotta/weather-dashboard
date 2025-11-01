import React, { useState } from 'react';
import weatherApi from '../api/weatherApi';

export default function SearchBar({ onSelect }){
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);

  const doSearch = async (term) => {
    setQ(term);
    if(!term) { setResults([]); return; }
    try{
      const res = await weatherApi.search(term);
      setResults(res.map(r=>r.name));
    }catch(e){
      setResults([]);
    }
  };

  return (
    <div className="searchbar">
      <input value={q} onChange={e=>doSearch(e.target.value)} placeholder="Search city..." />
      {results.length>0 && (
        <ul className="results">
          {results.map(r=> <li key={r} onClick={()=>{ onSelect(r); setQ(''); setResults([]); }}>{r}</li>)}
        </ul>
      )}
    </div>
  );
}
