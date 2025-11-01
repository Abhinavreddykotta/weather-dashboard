import { createSlice } from '@reduxjs/toolkit';

const initial = {
  user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
};

const slice = createSlice({
  name: 'auth',
  initialState: initial,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem('auth_user', JSON.stringify(action.payload));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('auth_user');
    }
  }
});

export const { setUser, clearUser } = slice.actions;
export default slice.reducer;
