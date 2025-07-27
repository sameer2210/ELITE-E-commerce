// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   products: []
// };

// const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {
//     loadproducts: (state, action) => {
//       state.products = action.payload;
//     },
//     loadlazyproducts: (state, action) => {
//       state.products = [...state.products, ...action.payload];
//     }
//   }
// });

// export const { loadproducts, loadlazyproducts } = productSlice.actions;
// export default productSlice.reducer;

//-----------------------------------------------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadproducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    loadlazyproducts: (state, action) => {
      state.products = [...state.products, ...action.payload];
      state.loading = false;
      state.error = null;
    },
    setProductLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProductError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetProducts: (state) => {
      state.products = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  loadproducts,
  loadlazyproducts,
  setProductLoading,
  setProductError,
  resetProducts,
} = productSlice.actions;

export default productSlice.reducer;
