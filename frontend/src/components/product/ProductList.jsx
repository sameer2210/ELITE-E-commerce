/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import axios from "../../api/config";
import { loadlazyproducts } from "../../store/reducers/productSlice";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductTemplate = lazy(() => import("./ProductCard"));

const ProductList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    if (loading) return; // Prevent multiple parallel fetches
    setLoading(true);
    try {
      const start = products.length;
      const limit = 6;
      const { data } = await axios.get(`/products?_limit=${limit}&_start=${start}`);

      if (data.length < limit) setHasMore(false);
      if (data.length > 0) dispatch(loadlazyproducts(data));
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchProducts}
      hasMore={hasMore}
      loader={<p className="text-center text-gray-500 py-4">Loading more products...</p>}
      endMessage={
        <p className="text-center text-green-600 py-4 font-semibold">
          Yay! You have seen all products.
        </p>
      }
    >
      <div className="flex flex-wrap gap-4 justify-center items-start px-4 py-6">
        {products.map((product, index) => (
          <Suspense
            key={product.id || product._id || Math.random()}
            fallback={<div className="text-center">Loading product...</div>}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
            >
              <ProductTemplate p={product} />
            </motion.div>
          </Suspense>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ProductList;