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
    },
    loadlazyproducts: (state, action) => {
      state.products = [...state.products, ...action.payload];
    }
  }
});

export const { loadproducts, loadlazyproducts } = productSlice.actions;
export default productSlice.reducer;
