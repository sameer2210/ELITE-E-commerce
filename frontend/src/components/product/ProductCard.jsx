/* eslint-disable no-unused-vars */

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, Eye, Heart } from "lucide-react";
import { asyncupdateuser } from "../../store/actions/userActions";
import { asyncAddtoCartProduct } from "../../store/actions/cartAction";

const ProductCard = ({ p }) => {

  const [isWishlisted, setIsWishlisted] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  const AddtoCartHandler = () => {
    if (!user) {
      toast.error("Please sign in to add items to your cart.");
      return;
    }
    try {
      const updatedUser = asyncAddtoCartProduct(user, p, p.id);
      dispatch(asyncupdateuser(updatedUser.id, updatedUser));
      toast.success(`${p.title.slice(0, 30)}... added to cart!`);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      console.log("Added to wishlist:", p);
    } else {
      console.log("Removed from wishlist:", p);
    }
  };


  // Calculate discount percentage if there's a higher original price
  const originalPrice = p.originalPrice || (p.price * 1.2);
  const discountPercentage = Math.round(((originalPrice - p.price) / originalPrice) * 100);
  const hasDiscount = discountPercentage > 0;

  return (
    <motion.div>

      <div className="group relative w-full  max-w-sm mx-auto mt-6  transition-all duration-700 transform hover:-translate-y-1 overflow-hidden ">
        {/* Premium Badge */}
        {p.randomOffer && (
          <div className="absolute top-4  z-10">
            <span className="bg-gradient-to-r from-amber-500 to-yellow-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              {p.randomOffer}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <motion.button
          onClick={toggleWishlist}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute top-2 right-5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isWishlisted
            ? 'bg-red-50 shadow-md'
            : 'bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm'
            }`}
        >
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${isWishlisted
              ? 'text-red-500 fill-red-500'
              : 'text-gray-400 hover:text-red-500'
              }`}
          />
        </motion.button>

        {/* Product Image Container */}
        <div className="relative h-72 w-68 mb-6 overflow-hidden bg-gradient-to-br from-stone-50 via-stone-25 to-white">
          <img
            className="w-full h-full  object-center object-fill p-5 group-hover:scale-110 transition-transform duration-700"
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
        <div className="px-6 pb-6 space-y-2">

          {/* Product Title */}
          <h1 className="text-lg font-serif font-medium text-stone-900 leading-tight line-clamp-2">
            {p.title.length > 40 ? `${p.title.slice(0, 40)}...` : p.title}
          </h1>

          {/* Product Description */}
          <p className="text-sm text-stone-600 leading-relaxed line-clamp-2">
            {p.description.slice(0, 50)}...
          </p>

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-800">
                ${p.price?.toLocaleString('en-IN') || '0'}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    ${originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-semibold text-teal-700 ">
                    {discountPercentage}% Off
                  </span>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;


