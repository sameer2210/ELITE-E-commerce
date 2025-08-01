// import axios from "../../api/config";
// import { toast } from "react-toastify";
// import { loadproducts, setProductError, setProductLoading } from "../reducers/productSlice";

// export const asyncloadproducts = () => async (dispatch, getState) => {
//   try {
//     const { productReducer: { products } } = getState();
//     if (products.length > 0) {
//       console.log("Products already loaded");
//       return;
//     }
//     dispatch(setProductLoading(true));
//     const { data } = await axios.get(`/products?_limit=20`);            // or remove _limit to fetch all
//     // localStorage.setItem("products", JSON.stringify(data));          // save data in local storage
//     dispatch(loadproducts(data));
//     console.log("Products fetched from API");
//   } catch (error) {
//     console.error("Failed to load products:", error);
//     dispatch(setProductError("Failed to load products"));
//     toast.error("Failed to load products.");
//   }
// };

// export const asynccreateproduct = (product) => async (dispatch) => {
//   try {
//     await axios.post("/products", product);
//     dispatch(asyncloadproducts());                        // Refresh the product list after creation
//     toast.success("Product created successfully!");
//     console.log("Product created!");
//   } catch (error) {
//     console.error("Error creating product:", error);
//     toast.error("Failed to create product. Please try again.");
//   }
// };

// export const asyncupdateproduct = (id, product) => async (dispatch) => {
//   try {
//     await axios.patch(`/products/${id}`, product);
//     dispatch(asyncloadproducts());

//     // dispatch(setProductLoading(true));
//     // // update logic
//     // dispatch(setProductLoading(false));

//     toast.success("Product updated successfully!");
//     console.log("Product updated!");
//   } catch (error) {
//     console.error("Failed to update product:", error);
//     toast.error("Could not update product. Please try again.");
//   }
// };

// export const asyncdeleteproduct = (id) => async (dispatch) => {
//   try {
//     await axios.delete(`/products/${id}`);
//     dispatch(asyncloadproducts());
//     toast.success("Product deleted successfully!");
//     console.log("Product deleted!");
//   } catch (error) {
//     console.error("Failed to delete product:", error);
//     toast.error("Could not delete product. Please try again.");
//   }
// };



//----------------------------------------------------------------------------------------------------------





import axios from "../../api/config";
import { toast } from "react-toastify";
import { loadproducts, setProductError, setProductLoading } from "../reducers/productSlice";

export const asyncloadproducts = () => async (dispatch, getState) => {
  try {
    const { productReducer: { products } } = getState();
    if (products.length > 0) {
      console.log("Products already loaded");
      return;
    }
    dispatch(setProductLoading(true));
    const { data } = await axios.get("/products?_limit=20");
    dispatch(loadproducts(data));
    console.log("Products fetched from API");
  } catch (error) {
    console.error("Failed to load products:", error);
    dispatch(setProductError("Failed to load products"));
    toast.error("Failed to load products.");
  } finally {
    dispatch(setProductLoading(false));
  }
};

export const asynccreateproduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(setProductLoading(true));
    const { data } = await axios.post("/products", product);
    const { productReducer: { products } } = getState();
    dispatch(loadproducts([...products, data]));
    toast.success("Product created successfully!");
    console.log("Product created!");
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    dispatch(setProductError("Failed to create product"));
    toast.error("Failed to create product. Please try again.");
    throw error;
  } finally {
    dispatch(setProductLoading(false));
  }
};

export const asyncupdateproduct = (id, product) => async (dispatch, getState) => {
  try {
    dispatch(setProductLoading(true));
    const { data } = await axios.patch(`/products/${id}`, product);
    const { productReducer: { products } } = getState();
    dispatch(loadproducts(products.map(p => (p.id === id ? data : p))));
    toast.success("Product updated successfully!");
    console.log("Product updated!");
    return data;
  } catch (error) {
    console.error("Failed to update product:", error);
    dispatch(setProductError("Failed to update product"));
    toast.error("Could not update product. Please try again.");
    throw error;
  } finally {
    dispatch(setProductLoading(false));
  }
};

export const asyncdeleteproduct = (id) => async (dispatch, getState) => {
  try {
    dispatch(setProductLoading(true));
    await axios.delete(`/products/${id}`);
    const { productReducer: { products } } = getState();
    dispatch(loadproducts(products.filter(p => p.id !== id)));
    toast.success("Product deleted successfully!");
    console.log("Product deleted!");
    return id;
  } catch (error) {
    console.error("Failed to delete product:", error);
    dispatch(setProductError("Failed to delete product"));
    toast.error("Could not delete product. Please try again.");
    throw error;
  } finally {
    dispatch(setProductLoading(false));
  }
};