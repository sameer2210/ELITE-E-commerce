import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import ProductForm from "../../components/product/productForm";
import { asyncupdateuser } from "../../store/actions/userActions";
import { asyncAddtoCartProduct } from "../../store/actions/cartAction";
import { asyncdeleteproduct, asyncupdateproduct } from "../../store/actions/productAction";
import { Star, Plus, Minus, Heart, Truck, Shield, RotateCcw, ArrowLeft } from "lucide-react";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { id } = useParams();
  const user = useSelector(state => state.userReducer.user || null);
  const { products, loading } = useSelector(state => state.productReducer);
  const product = products.find(p => p.id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Go to home page if product is deleted
  useEffect(() => {
    if (!product && products.length > 0) {
      navigate("/");
    }
  }, [product, products, navigate]);

  const handleQuantityChange = (change) => {
    if (loading) return;
    setQuantity(prev => Math.max(1, prev + change));
  };

  const UpdateHandler = async (data) => {
    if (loading) return;
    try {
      const updatedProduct = {
        ...product,
        image: data.image,
        title: data.title,
        price: Number(data.price) || 0,
        brand: data.brand,
        department: data.department,
        category: data.category,
        tag: data.tag,
        description: data.description
      };
      await dispatch(asyncupdateproduct(product.id, updatedProduct));
      toast.success("Product updated!");
      navigate("/");
    } catch (error) {
      console.log("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  const AddtoCartHandler = async () => {
    if (!user) {
      toast.error("Please login to add to cart");
      navigate("/login");
      return;
    }
    if (loading) return;
    try {
      const updatedUser = await asyncAddtoCartProduct(user, product, quantity);
      await dispatch(asyncupdateuser(user.id, updatedUser));
      toast.success(`${product.title} added to cart!`);
    } catch (error) {
      console.log("Error adding to cart:", error);
      toast.error("Failed to add to cart.");
    }
  };

  const DeleteHandler = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    if (loading) return;
    try {
      await dispatch(asyncdeleteproduct(product.id));
      toast.success("Product deleted!");
      navigate("/");
    } catch (error) {
      console.log("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  const handleWishlistToggle = () => {
    if (loading) return;
    setIsWishlisted(prev => !prev);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 ">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6 relative">
              {loading && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
                </div>
              )}
              {/* Product Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
                  <Button
                    onClick={() => navigate("/")}
                    disabled={loading}
                  ><ArrowLeft className="w-4 h-4" /> Back
                  </Button>
                </div>
                <p className="text-gray-600 mt-1">{product.subtitle || product.category}</p>
                <div className="flex items-center gap-2 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating || 4) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-sm text-gray-600">{product.rating || 4.0}</span>
                  <span className="text-sm text-gray-500">({product.reviews || 0} reviews)</span>
                </div>
                <div className="text-2xl font-bold text-gray-800 mt-2">
                  ${Number(product.price).toFixed(2)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Images */}
                <div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <img
                      src={product.images?.[selectedImage] || product.image || "https://via.placeholder.com/400"}
                      alt={product.title}
                      className="w-full h-80 object-contain rounded"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/400")}
                    />
                  </div>
                  {product.images?.length > 1 && (
                    <div className="flex gap-2 mt-2">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-12 h-12 rounded border-2 ${selectedImage === index ? "border-blue-500" : "border-gray-200"}`}
                          disabled={loading}
                        >
                          <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                  <p className="text-gray-700">{product.description || "No description."}</p>
                  {product.brand && (
                    <div>
                      <p className="text-sm text-gray-600">Brand</p>
                      <p className="font-medium text-gray-800">{product.brand}</p>
                    </div>
                  )}
                  {product.tag && (
                    <div>
                      <p className="text-sm text-gray-600">Tag</p>
                      <p className="font-medium text-gray-800">{product.tag}</p>
                    </div>
                  )}

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Quantity:</span>
                    <div className="flex border border-gray-300 rounded">
                      <Button
                        onClick={() => handleQuantityChange(-1)}
                        className="p-2 hover:bg-gray-100"
                        disabled={quantity <= 1 || loading}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="px-4 py-2">{quantity}</span>
                      <Button
                        onClick={() => handleQuantityChange(1)}
                        className="p-2 hover:bg-gray-100 rounded-tl-2xl rounded-tr-none"
                        disabled={loading}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      onClick={AddtoCartHandler}
                      disabled={loading}
                    >
                      {loading ? "Adding..." : "Add to Cart"}
                    </Button>
                    <Button
                      onClick={handleWishlistToggle}
                      className={` ${isWishlisted ? " text-red-500" : "border-gray-300 text-gray-700"}`}
                      disabled={loading}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500" : ""}`} />
                      {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    </Button>
                  </div>

                  {/* Product Info */}
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    {product.articleNumber && (
                      <div>
                        <p className="text-sm text-gray-600">Article number</p>
                        <p className="font-medium text-gray-800">{product.articleNumber}</p>
                      </div>
                    )}
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        <span>Free delivery over $100</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <span>2-year warranty</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" />
                        <span>30-day returns</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Edit Section */}
              {user?.isAdmin && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Edit Product</h2>
                  <ProductForm
                    isEdit={true}
                    defaultValues={product}
                    onSubmit={UpdateHandler}
                    onDelete={DeleteHandler}
                    loading={loading}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Related Products</h3>
                <Button
                  onClick={() => navigate("/")}
                  className="text-sm"
                  disabled={loading}
                >
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {products
                  .filter(item => item.id !== id)
                  .slice(0, 10)
                  .map(item => (
                    <div
                      key={item.id}
                      onClick={() => navigate(`/products/${item.id}`)}
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                    >
                      <img
                        src={item.image || "https://via.placeholder.com/50"}
                        alt={item.title}
                        className="w-12 h-12 rounded object-cover"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/50")}
                      />
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">{item.title}</h4>
                        <p className="text-sm text-gray-600">${Number(item.price).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                {products.length <= 1 && (
                  <p className="text-sm text-gray-500 text-center">No related products</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;