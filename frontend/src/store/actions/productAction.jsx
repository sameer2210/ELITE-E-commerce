/* eslint-disable no-unused-vars */
import axios from "../../api/config";
import { loadproducts } from "../reducers/productSlice";

export const asyncloadproducts = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/products");
    localStorage.setItem("products", JSON.stringify(data));
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
