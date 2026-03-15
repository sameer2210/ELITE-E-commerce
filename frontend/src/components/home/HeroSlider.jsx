import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSlider = () => {
  const slides = useMemo(
    () => [
      {
        id: 1,
        brand: "SAAS LAUNCH",
        title: "DASHBOARD READY",
        subtitle:
          "Build smarter products with modular UI, real-time insights, and polished flows.",
        cta: "VIEW PLATFORM",
        image:
          "https://source.unsplash.com/2000x1200/?saas,dashboard,ui,webapp",
      },
      {
        id: 2,
        brand: "DESIGN STUDIO",
        title: "WEB EXPERIENCES",
        subtitle:
          "Craft immersive sites with expressive layouts, bold typography, and crisp UX.",
        cta: "SEE PORTFOLIO",
        image:
          "https://source.unsplash.com/2000x1200/?web,design,studio,ux",
      },
      {
        id: 3,
        brand: "ECOMMERCE LAB",
        title: "CONVERTING STORES",
        subtitle:
          "Launch conversion-first storefronts with storytelling, speed, and clarity.",
        cta: "START SELLING",
        image:
          "https://source.unsplash.com/2000x1200/?ecommerce,website,landing,commerce",
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const activeSlide = slides[activeIndex];

  return (
    <section className="bg-stone-950 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-stone-900 shadow-2xl">
          <div className="absolute inset-0 z-10 bg-linear-to-r from-black/65 via-black/35 to-transparent"></div>

          <div className="relative h-90 sm:h-110 lg:h-130">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                  loading={index === activeIndex ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 z-20 flex">
            <div className="flex max-w-xl flex-col justify-center px-6 sm:px-10 lg:px-16">
              <span className="inline-flex w-fit items-center rounded-full bg-black/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                {activeSlide.brand}
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-wide">
                {activeSlide.title}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
                {activeSlide.subtitle}
              </p>
              <button className="mt-6 w-fit rounded-full border border-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-white hover:text-black">
                {activeSlide.cta}
              </button>
            </div>
          </div>

          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-lg transition hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-lg transition hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === activeIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
