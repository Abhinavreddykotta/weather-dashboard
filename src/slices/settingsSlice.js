import { createSlice } from '@reduxjs/toolkit';

const initial = { unit: localStorage.getItem('unit') || 'c' };

const slice = createSlice({
  name: 'settings',
  initialState: initial,
  reducers: {
    setUnit(state, action){
      state.unit = action.payload;
      localStorage.setItem('unit', action.payload);
    }
  }
});

export const { setUnit } = slice.actions;
export default slice.reducer;
