/* eslint-disable no-unused-vars */
// import { Link } from "react-router-dom";
// import { asyncAddtoCartProduct } from "../store/actions/productAction";
// import { asyncupdateuser } from "../store/actions/userActions";
// import { useDispatch, useSelector } from "react-redux";

// const ProductTemplate = ({ p }) => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.userReducer.user);

//   const AddtoCartHandler = () => {
//     if (!user) {
//       alert("Please sign in to add items to your cart.");
//       return;
//     }
//     const updatedUser = asyncAddtoCartProduct(user, p, p.id);
//     dispatch(asyncupdateuser(updatedUser.id, updatedUser));
//   };

//   return (
//     <div key={p.id} className="w-[31%] h-[65vh] shadow-lg p-2 mr-5 mb-5">
//       <img
//         className="h-[60%] block mx-auto"
//         src={p.image}
//         alt="network error"
//       />
//       <h1 className="text-2xl">{p.title.slice(0, 18)}...</h1>
//       <p className="mt-5">{p.description.slice(0, 90)}...</p>
//       <div className="flex justify-between items-center p-3">
//         <Link to={`/product-info/${p.id}`} className="text-blue-400">
//           More Info
//         </Link>
//         <button
//           onClick={AddtoCartHandler}
//           className="text-yellow-400  hover:text-yellow-600"
//         >
//           Add to cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductTemplate;

//-----------------------------------------------------------------------------------------------------------




import { Link } from "react-router-dom";
import { asyncAddtoCartProduct } from "../store/actions/productAction";
import { asyncupdateuser } from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ShoppingCart, Eye, Star } from "lucide-react";

const ProductTemplate = ({ p }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  const AddtoCartHandler = () => {
    if (!user) {
      toast.error("Please sign in to add items to your cart.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    
    try {
      const updatedUser = asyncAddtoCartProduct(user, p, p.id);
      dispatch(asyncupdateuser(updatedUser.id, updatedUser));
      
      toast.success(`${p.title.slice(0, 30)}... added to cart!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Failed to add item to cart. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="group relative w-full max-w-sm mx-auto bg-white rounded-xl mt-6 shadow-md hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-1 overflow-hidden border border-stone-100">
      {/* Premium Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
          PREMIUM
        </span>
      </div>

      {/* Wishlist/Favorite Icon */}
      <div className="absolute top-4 right-4 z-10">
        <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300">
          <Star className="w-4 h-4 text-stone-400 hover:text-amber-500 transition-colors duration-300" />
        </button>
      </div>

      {/* Product Image Container */}
      <div className="relative h-72 mb-6 overflow-hidden bg-gradient-to-br from-stone-50 via-stone-25 to-white">
        <img
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700"
          src={p.image}
          alt={p.title}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Quick actions overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="flex space-x-3">
            <Link 
              to={`/product-info/${p.id}`}
              className="w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:bg-white hover:scale-110 transition-all duration-300"
            >
              <Eye className="w-5 h-5 text-stone-600" />
            </Link>
            <button
              onClick={AddtoCartHandler}
              className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center shadow-xl hover:bg-stone-800 hover:scale-110 transition-all duration-300 group/cart"
            >
              <ShoppingCart className="w-5 h-5 text-white group-hover/cart:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="px-6 pb-6 space-y-4">
        {/* Product Category */}
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-stone-500 font-medium bg-stone-50 px-2 py-1 rounded-md">
            Premium Collection
          </span>
          <div className="flex items-center space-x-1">
            {[1,2,3,4,5].map((star) => (
              <Star key={star} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs text-stone-500 ml-1">(4.9)</span>
          </div>
        </div>

        {/* Product Title */}
        <h1 className="text-lg font-serif font-medium text-stone-900 leading-tight line-clamp-2">
          {p.title.length > 45 ? `${p.title.slice(0, 45)}...` : p.title}
        </h1>

        {/* Product Description */}
        <p className="text-sm text-stone-600 leading-relaxed line-clamp-2">
          {p.description.slice(0, 80)}...
        </p>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-stone-900">${p.price}</span>
            <span className="text-xs text-stone-500 line-through">${(p.price * 1.2).toFixed(2)}</span>
          </div>
          
          <button
            onClick={AddtoCartHandler}
            className="flex items-center space-x-2 bg-stone-900 hover:bg-stone-800 text-white px-4 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl group/btn"
          >
            <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium">Add to Cart</span>
          </button>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between pt- border-t border-stone-100">
          <span className="text-xs text-stone-500 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            In Stock
          </span>
          <span className="text-xs text-stone-500">Free Shipping</span>
        </div>
      </div>
    </div>
  );
};

export default ProductTemplate;