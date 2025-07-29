import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Auth from "./Auth";
import Unauth from "./Unauth";
import Carts from "../pages/cart/Cart";
import Settings from "../pages/user/Settings";
import ProductCreate from "../pages/admin/ProductCreate";
import ProductDetails from './../pages/product/ProductDetails';

// Lazy-loaded components
const Signup = lazy(() => import("../pages/user/Signup"));
const Signin = lazy(() => import("../pages/user/Signin"));
const Products = lazy(() => import("../components/product/ProductList"));
const About = lazy(() => import("../pages/general/About"));
const Contact = lazy(() => import("../pages/general/Contact"));
const PageNotFound = lazy(() => import("../pages/general/PageNotFound"));

const Loader = () => (
  <div className="text-center py-20 text-lg font-medium text-gray-600">
    Loading...
  </div>
);

const Mainroutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth-Protected */}
        <Route path="/settings" element={<Auth><Settings /></Auth>} />
        <Route path="/productCreate" element={<Auth><ProductCreate /></Auth>} />
        <Route path="/product-info/:id" element={<Auth><ProductDetails /></Auth>} />
        <Route path="/cart" element={<Auth><Carts /></Auth>} />

        {/* Unauthenticated Only */}
        <Route path="/signin" element={<Unauth><Signin /></Unauth>} />
        <Route path="/signup" element={<Unauth><Signup /></Unauth>} />

        {/* Catch All */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Mainroutes;
