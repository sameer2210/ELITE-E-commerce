/* eslint-disable react-hooks/exhaustive-deps */
import axios from "../api/config";
import { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadlazyproducts } from "../store/reducers/productSlice";
const ProductTemplate = lazy(() => import("../components/ProductTemplate"));
import InfiniteScroll from "react-infinite-scroll-component";

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const [hasMore, sethasMore] = useState(true);

  const fetchproducts = async () => {
    try {
      const { data } = await axios.get(
        `/products?_limit=6&_start=${products.length}`
      );
      if (data.length === 0) {
        sethasMore(false);
      } else {
        dispatch(loadlazyproducts(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchproducts}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="flex flex-wrap">
        {products.map((p, i) => (
          <Suspense key={i} fallback={<h1>LOADING...</h1>}>
            <ProductTemplate p={p} />
          </Suspense>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Products;
