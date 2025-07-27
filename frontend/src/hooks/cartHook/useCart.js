import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { asyncAddtoCartProduct } from "@/store/actions/productAction";
import { asyncupdateuser } from "@/store/actions/userActions";

export const useAddToCart = (user) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product) => {
    try {
      if (!user) {
        toast.error("Please login to add items to cart");
        return;
      }

      const updatedUser = asyncAddtoCartProduct(user, product, product.id);
      dispatch(asyncupdateuser(updatedUser.id, updatedUser));
      toast.success(`${product.title} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

  return addToCartHandler;
};





//   const AddtoCartHandler = () => {
//     try {
//       if (!user) {
//         toast.error("Please login to add items to cart");
//         return;
//       }
//       // console.log("Add to cart:", { product, quantity });

//       const updatedUser = asyncAddtoCartProduct(user, product, product.id);
//       dispatch(asyncupdateuser(updatedUser.id, updatedUser));
//       toast.success(`${product.title} added to cart!`);
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       toast.error("Failed to add item to cart. Please try again.");
//     }
//   };




