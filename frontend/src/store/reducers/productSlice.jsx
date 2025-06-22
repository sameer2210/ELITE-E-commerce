import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: []
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadproducts: (state, action) => {
      state.products = action.payload;
    }
  }
});

export const { loadproducts } = productSlice.actions;
export default productSlice.reducer;
