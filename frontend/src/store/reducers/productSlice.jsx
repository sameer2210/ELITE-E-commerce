import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Products: []
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadproducts: (state, action) => {
      state.Products = action.payload;
    }
  }
});

export const { loadproducts } = productSlice.actions;
export default productSlice.reducer;
