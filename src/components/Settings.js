import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUnit } from '../slices/settingsSlice';

export default function Settings(){
  const unit = useSelector(s=>s.settings.unit);
  const dispatch = useDispatch();

  return (
    <div className="settings">
      <h2>Settings</h2>
      <div>
        <label>
          <input type="radio" checked={unit==='c'} onChange={()=>dispatch(setUnit('c'))} /> Celsius
        </label>
        <label>
          <input type="radio" checked={unit==='f'} onChange={()=>dispatch(setUnit('f'))} /> Fahrenheit
        </label>
      </div>
    </div>
  );
}
