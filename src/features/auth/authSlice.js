import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = {
        name: action.payload?.name || 'User',
        email: action.payload?.email || '',
      };
    },
    loginAsGuest: (state) => {
      state.isAuthenticated = true;
      state.user = { name: 'Guest', email: 'guest@shopzone.local' };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, loginAsGuest, logout } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;
