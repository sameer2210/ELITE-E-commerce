import React from "react";
import HeroSlider from "../../components/home/HeroSlider";
import ProductList from "../../components/product/ProductList";

const Home = () => {
  return (
    <div className="bg-stone-950">
      <HeroSlider />
      <section className="bg-white">
        <ProductList />
      </section>
    </div>
  );
};

export default Home;
