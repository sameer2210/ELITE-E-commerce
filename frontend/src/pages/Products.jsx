// /* eslint-disable react-hooks/exhaustive-deps */
// import axios from "../api/config";
// import { lazy, Suspense, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loadlazyproducts } from "../store/reducers/productSlice";
// const ProductTemplate = lazy(() => import("../components/ProductTemplate"));
// import InfiniteScroll from "react-infinite-scroll-component";

// const Products = () => {
//   const dispatch = useDispatch();
//   const { products } = useSelector((state) => state.productReducer);
//   const [hasMore, sethasMore] = useState(true);

//   const fetchproducts = async () => {
//     try {
//       const { data } = await axios.get(
//         `/products?_limit=6&_start=${products.length}`
//       );
//       if (data.length === 0) {
//         sethasMore(false);
//       } else {
//         dispatch(loadlazyproducts(data));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchproducts();
//   }, []);

//   return (
//     <InfiniteScroll
//       dataLength={products.length}
//       next={fetchproducts}
//       hasMore={hasMore}
//       loader={<h4>Loading...</h4>}
//       endMessage={
//         <p style={{ textAlign: "center" }}>
//           <b>Yay! You have seen it all</b>
//         </p>
//       }
//     >
//       <div className="flex flex-wrap">
//         {products.map((p, i) => (
//           <Suspense key={i} fallback={<h1>LOADING...</h1>}>
//             <ProductTemplate p={p} />
//           </Suspense>
//         ))}
//       </div>
//     </InfiniteScroll>
//   );
// };

// export default Products;


//---------------------------------------------------------------------------------------------------------

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../api/config";
import { loadlazyproducts } from "../store/reducers/productSlice";

const ProductTemplate = lazy(() => import("../components/ProductTemplate"));

const Products = () => {
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
      <div className="flex flex-wrap gap-4 justify-center px-4 py-6">
        {products.map((product) => (
          <Suspense
            key={product.id || product._id || Math.random()}
            fallback={<div className="text-center">Loading product...</div>}
          >
            <ProductTemplate p={product} />
          </Suspense>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Products;
