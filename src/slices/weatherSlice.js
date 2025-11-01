import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import weatherApi from '../api/weatherApi';
import cache from '../utils/cache';

export const fetchCurrentAndForecast = createAsyncThunk('weather/fetchCurrentAndForecast',
  async ({ q }, thunkAPI) => {
    const cacheKey = `weather:${q}`;
    const cached = cache.get(cacheKey);
    if(cached) return cached;

    const data = await weatherApi.getForecast(q);
    cache.set(cacheKey, data, 60); 
    return data;
  }
);

const slice = createSlice({
  name: 'weather',
  initialState: { entities: {}, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentAndForecast.pending, (s)=>{ s.status='loading'; })
      .addCase(fetchCurrentAndForecast.fulfilled, (s, action)=>{
        s.status='succeeded';
        s.entities[action.payload.location.name] = action.payload;
      })
      .addCase(fetchCurrentAndForecast.rejected, (s, action)=>{
        s.status='failed';
        s.error = action.error.message;
      });
  }
});

export default slice.reducer;
