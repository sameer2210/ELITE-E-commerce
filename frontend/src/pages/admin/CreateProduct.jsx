/* eslint-disable no-unused-vars */
// import { nanoid } from "nanoid";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { asynccreateproduct } from "../../store/actions/productAction";

// const CreateProduct = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { register, handleSubmit } = useForm();

//   const SigninHandler = (product) => {
//     product.id = nanoid();
//     dispatch(asynccreateproduct(product));
//     navigate("/");
//   };
//   return (
//     <form onSubmit={handleSubmit(SigninHandler)} className="p-5 w-full">
//       <input
//         {...register("image")}
//         className="w-full text-3xl border-b outline-0 p-2 mb-5"
//         type="url"
//         placeholder="Product Image"
//       />
//       <input
//         {...register("title")}
//         className="w-full text-3xl border-b outline-0 p-2 mb-5"
//         type="text"
//         placeholder="Product Name"
//       />
//       <input
//         {...register("price")}
//         className="w-full text-3xl border-b outline-0 p-2 mb-5"
//         type="text"
//         placeholder="0.00"
//       />
//       <input
//         {...register("category")}
//         className="w-full text-3xl border-b outline-0 p-2 mb-5"
//         type="text"
//         placeholder="Product Category"
//       />
//       <textarea
//         {...register("description")}
//         className="w-full text-3xl border-b outline-0 p-2 mb-5"
//         type="text"
//         placeholder="enter description here..."
//       ></textarea>
//       <button className="text-white text-3xl px-5 py-3 rounded bg-teal-800">
//         Create Product
//       </button>
//     </form>
//   );
// };

// export default CreateProduct;

//--------------------------------------------------------------------------------------------------------

import { useState } from "react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asynccreateproduct } from "../../store/actions/productAction";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const product = { ...data, id: nanoid() };
      await dispatch(asynccreateproduct(product));
      toast.success("Product created successfully!");
      reset();
      navigate("/");
    } catch (errors) {
      toast.error("Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            Create New Product
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            Add a new product to your inventory
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
          <div className="p-8 lg:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Product Image */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-3 tracking-wide uppercase">
                  Product Image
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    {...register("image", {
                      required: "Product image is required"
                    })}
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 bg-slate-50/50 focus:bg-white"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                {errors.image && (
                  <p className="mt-2 text-sm text-red-500 font-medium">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* Product Name */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-3 tracking-wide uppercase">
                  Product Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                  <input
                    {...register("title", {
                      required: "Product name is required"
                    })}
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 bg-slate-50/50 focus:bg-white"
                    type="text"
                    placeholder="Enter product name"
                  />
                </div>
                {errors.title && (
                  <p className="mt-2 text-sm text-red-500 font-medium">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Price and Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-3 tracking-wide uppercase">
                    Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-slate-400 group-focus-within:text-indigo-500 font-semibold transition-colors">
                        $
                      </span>
                    </div>
                    <input
                      {...register("price", {
                        required: "Price is required",
                        min: { value: 0, message: "Price must be positive" }
                      })}
                      className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 bg-slate-50/50 focus:bg-white"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-2 text-sm text-red-500 font-medium">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-3 tracking-wide uppercase">
                    Category
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <input
                      {...register("category", {
                        required: "Category is required"
                      })}
                      className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 bg-slate-50/50 focus:bg-white"
                      type="text"
                      placeholder="Electronics, Fashion, etc."
                    />
                  </div>
                  {errors.category && (
                    <p className="mt-2 text-sm text-red-500 font-medium">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-3 tracking-wide uppercase">
                  Description
                </label>
                <div className="relative">
                  <textarea
                    {...register("description", {
                      required: "Description is required"
                    })}
                    rows={4}
                    className="w-full px-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 bg-slate-50/50 focus:bg-white resize-none"
                    placeholder="Describe your product features, benefits, and specifications..."
                  />
                </div>
                {errors.description && (
                  <p className="mt-2 text-sm text-red-500 font-medium">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="pt-6 flex flex-col sm:flex-row gap-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex-1 bg-black hover:bg-gray-900 text-white font-medium py-4 px-8 rounded border-2 border-black hover:border-gray-900 transition-all duration-300 text-lg tracking-wider uppercase overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                  <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                    {isSubmitting ? "Creating..." : "Create Product"}
                  </span>
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => reset()}
                  className="group relative bg-transparent text-gray-900 font-light py-3 px-12 border-b-2 border-gray-300 hover:border-gray-900 transition-all duration-500 text-lg tracking-widest uppercase overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-500"></span>
                  <span className="relative z-10 transform group-hover:translate-y-1 transition-transform duration-300">
                    {isSubmitting ? "Wait..." : "reset"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            All fields are required to create a new product
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
