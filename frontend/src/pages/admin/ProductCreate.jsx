// import { nanoid } from "nanoid";
// import { toast } from "react-toastify";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import ProductForm from "../../components/product/productForm";
// import { asynccreateproduct } from "../../store/actions/productAction";

// const ProductCreate = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { reset, } = useForm();
//   const [isSubmitting, setIsSubmitting] = useState(false);


//   const handleCreate = async (data) => {
//     if (isSubmitting) return;
//     setIsSubmitting(true);

//     try {
//       const product = { ...data, id: nanoid() };
//       await dispatch(asynccreateproduct(product));
//       toast.success("Product created successfully!");
//       reset();
//       setTimeout(() => navigate("/"), 300);
//     } catch {
//       toast.error(" Failed to create product");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8 px-4">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <header className="text-center ">
//           <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
//             Create New Product
//           </h1>
//           <p className="text-slate-600 text-lg">
//             Fill out the details to add a new item to your store.
//           </p>
//         </header>

//         {/* Form Card */}
//         <div>
//           <ProductForm
//             defaultValues={{}}
//             onSubmit={handleCreate}
//             isEdit={false}
//             isSubmitting={isSubmitting}
//           />
//         </div>

//       </div>
//     </section>
//   );
// };

// export default ProductCreate;





//---------------------------------------------------------------------------------------------







import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import ProductForm from "../../components/product/productForm";
import { asynccreateproduct } from "../../store/actions/productAction";
import Button from "../../components/common/Button";
import { ArrowLeft } from "lucide-react";

const ProductCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer || {});
  const [loading, setLoading] = useState(false);

  // Redirect non-admins
  if (!user?.isAdmin) {
    toast.error("You must be an admin to create products");
    setTimeout(() => navigate("/"), 300);
    return null;
  }

  const handleCreate = async (data) => {
    if (loading) return;
    setLoading(true);

    try {
      const product = { ...data, id: nanoid() };
      await dispatch(asynccreateproduct(product));
      toast.success("Product created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(error.message || "Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Create New Product
            </h1>
            <Button
              onClick={() => navigate("/")}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Products
            </Button>
          </div>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Fill out the details to add a new item to your store.
          </p>
        </header>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <ProductForm
            defaultValues={{
              image: "",
              title: "",
              price: "",
              brand: "",
              department: "",
              category: "",
              tag: "",
              description: ""
            }}
            onSubmit={handleCreate}
            isEdit={false}
            loading={loading}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductCreate;