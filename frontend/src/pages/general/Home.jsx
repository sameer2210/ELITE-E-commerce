import React from "react";
import HeroSlider from "../../components/home/HeroSlider";
import ProjectList from "../../components/project/ProjectList";

const Home = () => {
  return (
    <div className="bg-stone-950">
      <HeroSlider />
      <section className="bg-white">
        <ProjectList />
      </section>
    </div>
  );
};

export default Home;
