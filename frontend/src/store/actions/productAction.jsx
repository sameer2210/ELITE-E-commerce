/* eslint-disable no-unused-vars */
import axios from "../../api/config";
import { loadproducts } from "../reducers/productSlice";

export const asyncloadproducts = () => async (dispatch, getState) => {
  try {
    const {
      productReducer: { products }
    } = getState();
    if (products.length > 0) {
      console.log("Products already loaded");
      return;
    }
    const { data } = await axios.get(`/products?_limit=20`);             // or remove _limit to fetch all
    // localStorage.setItem("products", JSON.stringify(data));          // save data in local storage
    dispatch(loadproducts(data));
    console.log("Products loaded!");
  } catch (error) {
    console.log(error);
  }
};

export const asynccreateproduct = (Product) => async (dispatch, getState) => {
  try {
    await axios.post("/products", Product);
    dispatch(asyncloadproducts());
    console.log("Product created!");
  } catch (error) {
    console.log(error);
  }
};

export const asyncupdateproduct =
  (id, product) => async (dispatch, getState) => {
    try {
      await axios.patch(`/products/${id}`, product);
      dispatch(asyncloadproducts());
      console.log("Product updated!");
    } catch (error) {
      console.log(error);
    }
  };

export const asyncdeleteproduct = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/products/${id}`);
    dispatch(asyncloadproducts());
    console.log("Product deleted!");
  } catch (error) {
    console.log(error);
  }
};
