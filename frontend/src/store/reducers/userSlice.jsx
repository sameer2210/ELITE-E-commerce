/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LoginUser: (state, action) => {
        state.user = action.payload;        
    },
    LogoutUser: (state, action) => {
           state.user = null;               
    }
  }
});

export const { LoginUser, LogoutUser } = userSlice.actions;
export default userSlice.reducer;
