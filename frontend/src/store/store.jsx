import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import productSlice from "./reducers/productSlice";

// Create store
export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    productReducer: productSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false, // optional: for non-serializable state
  //   }),
  // devTools: process.env.NODE_ENV !== "production", // enable Redux DevTools in dev only
});
