import { configureStore } from '@reduxjs/toolkit';
import appUserReducer from './appUserSlice';
import basketReducer from './basketSlice.js';

export const store = configureStore({
  reducer: {
    appUser: appUserReducer,
    basket: basketReducer,
  },
});