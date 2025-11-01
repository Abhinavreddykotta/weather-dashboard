import { createSlice } from '@reduxjs/toolkit';

const initial = { items: [] };

const slice = createSlice({
  name: 'favorites',
  initialState: initial,
  reducers: {
    addFavorite(state, action){
      if(!state.items.includes(action.payload)) state.items.push(action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
    removeFavorite(state, action){
      state.items = state.items.filter(i=>i!==action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.items));
    }
  }
});

export const { addFavorite, removeFavorite } = slice.actions;

export const loadFavorites = () => dispatch => {
  const raw = localStorage.getItem('favorites');
  if(raw){
    try{
      const items = JSON.parse(raw);
      dispatch({ type: 'favorites/load', payload: items });
    }catch(e){}
  }
};

slice.reducer.initialState = initial;
slice.actions.load = payload => ({ type: 'favorites/load', payload });

export default slice.reducer;
