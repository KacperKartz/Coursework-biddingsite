import { configureStore } from '@reduxjs/toolkit';
import appUserReducer from './appUserSlice';

export const store = configureStore({
  reducer: {
    appUser: appUserReducer,
  },
});