// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { asyncupdateuser } from "../../store/actions/userActions";
// import {
//   asyncAddtoCartProduct,
//   asyncdeleteproduct,
//   asyncupdateproduct
// } from "../../store/actions/productAction";

// const DetailsProduct = () => {
//   const { id } = useParams();
//   const { products } = useSelector((state) => state.productReducer);
//   const { user } = useSelector((state) => state.userReducer);
//   const product = products?.find((p) => p.id == id);

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     image: product?.image,
  //     title: product?.title,
  //     price: product?.price,
  //     category: product?.category,
  //     description: product?.description
  //   }
  // });

//   const UpdateHandler = (updatedproduct) => {
//     dispatch(asyncupdateproduct(product.id, updatedproduct));
//     navigate("/");
//   };

//   const AddtoCartHandler = () => {
//     const updatedUser = asyncAddtoCartProduct(user, product, product.id);
//     dispatch(asyncupdateuser(updatedUser.id, updatedUser));
//   };

//   const DeleteHandler = () => {
//     dispatch(asyncdeleteproduct(id));
//     navigate("/");
//   };

//   return product ? (
//     <div className="w-full">
//       <div className="w-full">
//         <img
//           src={product?.image}
//           className="block mx-auto h-[30vmax]"
//           alt="network error"
//         />
//         <h1 className="text-2xl mt-3 ">{product?.title}</h1>
//         <p>{product?.description}</p>
//         <h2 className="text-red-400 mt-3 text-5xl ">{product?.price}</h2>
//         <button
//           onClick={AddtoCartHandler}
//           className="rounded px-4 py-3 bg-yellow-400 mt-5"
//         >
//           Add to Cart
//         </button>
//       </div>
//       {/*  */}
//       <hr className="my-10" />
//       {user?.isAdmin && (
//         <form onSubmit={handleSubmit(UpdateHandler)} className="p-5 w-full">
//           <h1 className="text-blue-400 mb-5 text-5xl ">
//             Update Product Details
//           </h1>
//           <input
//             {...register("image")}
//             className="w-full text-3xl border-b outline-0 p-2 mb-5"
//             type="url"
//             placeholder="Product Image"
//           />
//           <input
//             {...register("title")}
//             className="w-full text-3xl border-b outline-0 p-2 mb-5"
//             type="text"
//             placeholder="Product Name"
//           />
//           <input
//             {...register("price")}
//             className="w-full text-3xl border-b outline-0 p-2 mb-5"
//             type="text"
//             placeholder="0.00"
//           />
//           <input
//             {...register("category")}
//             className="w-full text-3xl border-b outline-0 p-2 mb-5"
//             type="text"
//             placeholder="Product Category"
//           />
//           <textarea
//             {...register("description")}
//             className="w-full text-3xl border-b outline-0 p-2 mb-5"
//             type="text"
//             placeholder="enter description here..."
//           ></textarea>
//           <button className="mr-5 text-white text-3xl px-5 py-3 rounded bg-neutral-800">
//             Update Product
//           </button>
//           <button
//             onClick={DeleteHandler}
//             type="button"
//             className="text-white text-3xl px-5 py-3 rounded bg-red-600"
//           >
//             Delete Product
//           </button>
//         </form>
//       )}
//       {/*  */}
//     </div>
//   ) : (
//     "Loading..."
//   );
// };

// export default DetailsProduct;

//---------------------------------------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { asyncupdateuser } from "../../store/actions/userActions";
import {
  asyncAddtoCartProduct,
  asyncdeleteproduct,
  asyncupdateproduct
} from "../../store/actions/productAction";
import {
  Star,
  Plus,
  Minus,
  Heart,
  Truck,
  Shield,
  RotateCcw
} from "lucide-react";

const DetailsProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { id } = useParams();
  const { products } = useSelector((state) => state.productReducer);
  const { user } = useSelector((state) => state.userReducer);
  const product = products?.find((p) => p.id == id);

  const dispatch = useDispatch();
  const navigate = useNavigate();



  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      image: product?.image,
      title: product?.title,
      price: product?.price,
      category: product?.category,
      description: product?.description
    }
  });


  // Update form when product loads
  useEffect(() => {
    if (product) {
      reset({
        image: product?.image || product?.images?.[0] || "",
        title: product?.title || "",
        price: product?.price || "",
        category: product?.category || "",
        description: product?.description || ""
      });
    }
  }, [product, reset]);

  // Handle quantity changes
  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const UpdateHandler = handleSubmit((data) => {
    try {
      console.log("Update product:", data);
      const updatedProduct = {
        ...product,
        image: data.image,
        title: data.title,
        price: parseFloat(data.price),
        category: data.category,
        description: data.description
      };

      dispatch(asyncupdateproduct(product.id, updatedProduct));
      toast.success("Product updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    }
  });

  const AddtoCartHandler = () => {
    try {
      if (!user) {
        toast.error("Please login to add items to cart");
        return;
      }
      // console.log("Add to cart:", { product, quantity });

      const updatedUser = asyncAddtoCartProduct(user, product, product.id);
      dispatch(asyncupdateuser(updatedUser.id, updatedUser));
      toast.success(`${product.title} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

  const DeleteHandler = () => {
    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        console.log("Delete product:", product.id);
        dispatch(asyncdeleteproduct(product.id));
        toast.success("Product deleted successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };

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
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
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

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm text-gray-600">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-medium">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={AddtoCartHandler}
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

              {/* Admin Update Section */}
              {user?.isAdmin && (
                <form
                  onSubmit={UpdateHandler}
                  className="mt-12 p-6 bg-gray-50 rounded-xl border-t border-gray-200"
                >
                  <h2 className="text-xl font-semibold text-blue-600 mb-6">
                    Admin: Update Product Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      {...register("image")}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="url"
                      placeholder="Product Image URL"
                    />
                    <input
                      {...register("title")}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      placeholder="Product Name"
                    />
                    <input
                      {...register("price")}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="number"
                      step="0.01"
                      placeholder="Price"
                    />
                    <input
                      {...register("category")}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      placeholder="Category"
                    />
                  </div>

                  <textarea
                    {...register("description")}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
                    rows="4"
                    placeholder="Product Description"
                  ></textarea>

                  <div className="flex gap-4 mt-6">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Update Product
                    </button>
                    <button
                      type="button"
                      onClick={DeleteHandler}
                      className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      Delete Product
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsProduct;
