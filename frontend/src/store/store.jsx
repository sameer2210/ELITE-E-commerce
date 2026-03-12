import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';

// Create store
export const store = configureStore({
  reducer: {
    userReducer: userSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
