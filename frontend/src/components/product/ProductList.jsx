/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useInfiniteProducts } from "../../api/products";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { lazy, Suspense } from "react";

const ProductTemplate = lazy(() => import("./ProductCard"));

const ProductList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteProducts({ limit: 6 });

  const products = data?.pages?.flat() || [];

  const fetchProducts = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  return (
    <>
      {isError && (
        <p className="text-center text-red-500 py-4 font-semibold">
          Failed to load products. Please try again.
        </p>
      )}
      {isLoading && (
        <p className="text-center text-gray-500 py-4">
          Loading products...
        </p>
      )}
      <InfiniteScroll
        dataLength={products.length}
        next={fetchProducts}
        hasMore={Boolean(hasNextPage)}
        loader={
          <p className="text-center text-gray-500 py-4">
            Loading more products...
          </p>
        }
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
    </>
  );
};

export default ProductList;
