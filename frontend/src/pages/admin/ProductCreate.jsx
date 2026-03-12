import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import Button from "../../components/common/Button";
import ProductForm from "../../components/product/ProductForm";
import { useCreateProduct } from "../../api/products";

const ProductCreate = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer || {});
  const { mutateAsync: createProduct, isPending } = useCreateProduct();

  // Redirect non-admins
  if (!user?.isAdmin) {
    toast.error("You must be an admin to create products");
    setTimeout(() => navigate("/"), 300);
    return null;
  }

  const handleCreate = async (data) => {
    if (isPending) return;

    try {
      await createProduct({ ...data });
      toast.success("Product created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(
        error.message || "Failed to create product. Please try again."
      );
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Create New Product
            </h1>
            <Button onClick={() => navigate("/")} className="text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Products
            </Button>
          </div>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Fill out the details to add a new item to your store.
          </p>
        </header>

        {/* Form Card */}
        <div>
          <ProductForm
            defaultValues={{
              image: "",
              title: "",
              price: "",
              brand: "",
              department: "",
              category: "",
              tag: "",
              description: "",
            }}
            onSubmit={handleCreate}
            isEdit={false}
            loading={isPending}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductCreate;
