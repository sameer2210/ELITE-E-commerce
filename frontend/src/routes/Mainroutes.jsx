import React from "react";
import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

import Auth from "./Auth";
import Unauth from "./Unauth";
import Settings from "../pages/user/Settings";
import CreateProduct from "../pages/admin/CreateProduct";
import DetailsProduct from "../pages/admin/DetailsProduct";
import Carts from "../pages/user/Carts";

const Signup = lazy(() => import("./../pages/user/Signup"));
const Signin = lazy(() => import("./../pages/user/Signin"));
const Products = lazy(() => import("./../pages/Products"));
const About = lazy(() => import("./../pages/About"));
const PageNotFound = lazy(() => import("./../pages/PageNotFound"));

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />

      <Route
        path="/signin"
        element={
          <Unauth>
            <Signin />
          </Unauth>
        }
      />
      <Route
        path="/signup"
        element={
          <Unauth>
            <Signup />
          </Unauth>
        }
      />

      <Route
        path="/settings"
        element={
          <Auth>
            <Settings />
          </Auth>
        }
      />
      <Route
        path="/create-product"
        element={
          <Auth>
            <CreateProduct />
          </Auth>
        }
      />
      <Route
        path="/product-info/:id"
        element={
          <Auth>
            <DetailsProduct />
          </Auth>
        }
      />
      <Route
        path="/cart"
        element={
          <Auth>
            <Carts />
          </Auth>
        }
      />

      <Route path="/about" element={<About />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Mainroutes;
