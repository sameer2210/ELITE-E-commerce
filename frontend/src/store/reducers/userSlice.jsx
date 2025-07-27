// /* eslint-disable no-unused-vars */
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     LoginUser: (state, action) => {
//         state.user = action.payload;
//     },
//     LogoutUser: (state, action) => {
//            state.user = null;
//     }
//   }
// });

// export const { LoginUser, LogoutUser } = userSlice.actions;
// export default userSlice.reducer;

//----------------------------------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true             // user session check in progress
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LoginUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    LogoutUser: (state) => {
      state.user = null;
      state.loading = false;
    },
    SetLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { LoginUser, LogoutUser, SetLoading } = userSlice.actions;
export default userSlice.reducer;
