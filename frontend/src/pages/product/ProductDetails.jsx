import React from 'react'

import  { useState} from "react";
import {  useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Star,
  Plus,
  Minus,
  Heart,
  Truck,
  Shield,
  RotateCcw
} from "lucide-react";

const ProductDetails = () => {
      const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  
  const { id } = useParams();
  const { products } = useSelector((state) => state.productReducer);
   const product = products?.find((p) => p.id == id);

  const navigate = useNavigate();

      const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  // Loading state
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }


  return (
    <div>

         {/* Left Sidebar - Related Products */}
          <div className="w-80 bg-white/90 backdrop-blur-sm rounded-2xl p-6 h-fit">
            <div className="flex items-center mb-6">
              <button
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                ← All Products
              </button>
            </div>

            <div className="space-y-4">
              {products.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-800">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              {/* Product Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {product.title}
                </h1>
                <p className="text-gray-600 mb-4">
                  {product.subtitle || product.category}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating || 4)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating || 4.0}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({product.reviews || 25} reviews)
                  </span>
                </div>

                <div className="text-4xl font-bold text-gray-800 mb-6">
                  $
                  {typeof product.price === "number"
                    ? product.price.toLocaleString()
                    : product.price}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Images */}
                <div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <img
                      src={product.images?.[selectedImage] || product.image}
                      alt={product.title}
                      className="w-full h-96 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop";
                      }}
                    />
                  </div>

                  {product.images && product.images.length > 1 && (
                    <div className="flex gap-2">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                            selectedImage === index
                              ? "border-blue-500"
                              : "border-gray-200"
                          }`}
                        >
                          <img
                            src={image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {product.designer && (
                      <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-1">Designer</p>
                        <p className="font-semibold text-gray-800">
                          {product.designer}
                        </p>
                      </div>
                    )}
                  </div>

                 

                  {/* Add to Cart Button */}
                  <button
                    // onClick={}
                    className="w-full bg-gray-800 text-white font-semibold py-4 rounded-xl hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                  >
                    Add to cart
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={handleWishlistToggle}
                    className={`w-full border-2 font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                      isWishlisted
                        ? "border-red-500 text-red-500 bg-red-50"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                    {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  </button>

                  {/* Product Info */}
                  <div className="pt-6 border-t border-gray-200">
                    {product.articleNumber && (
                      <>
                        <p className="text-sm text-gray-600 mb-2">
                          Article number
                        </p>
                        <p className="font-medium text-gray-800 mb-4">
                          {product.articleNumber}
                        </p>
                      </>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Truck className="w-4 h-4" />
                        <span>Free delivery on orders over $100</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Shield className="w-4 h-4" />
                        <span>2-year international warranty</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <RotateCcw className="w-4 h-4" />
                        <span>30-day return policy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}

export default ProductDetails;