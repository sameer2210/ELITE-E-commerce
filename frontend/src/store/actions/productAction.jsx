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
    const { data } = await axios.get(`/products?_limit=20`); // or remove _limit to fetch all
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

export const asyncAddtoCartProduct = (user, product, id) => {
  try {
    const copyUser = { ...user, cart: [...(user.cart || [])] };

    const index = copyUser?.cart.findIndex((x) => x?.product.id == id);
    if (index == -1) {
      copyUser.cart.push({ product, quantity: 1 });
    } else {
      copyUser.cart[index] = {
        product,
        quantity: copyUser.cart[index].quantity + 1
      };
    }
    return copyUser;
  } catch (error) {
    console.error("Error in asyncAddtoCartProduct:", error);
    return user;
  }
};
