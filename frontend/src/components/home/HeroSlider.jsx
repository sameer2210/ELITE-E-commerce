import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSlider = () => {
  const slides = useMemo(
    () => [
      {
        id: 1,
        brand: "DARVEYS",
        title: "GLOBAL FAVOURITES",
        subtitle:
          "Shop Hugo Boss, Prada, Gucci, Balenciaga, Balmain, Moncler & more",
        cta: "DISCOVER",
        image:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
      },
      {
        id: 2,
        brand: "LUXE EDIT",
        title: "TAILORED ICONS",
        subtitle:
          "Statement silhouettes and signature details, curated for modern style.",
        cta: "SHOP NOW",
        image:
          "https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
      },
      {
        id: 3,
        brand: "ÉLITE",
        title: "SEASON HIGHLIGHTS",
        subtitle:
          "Discover the edit of the season with premium essentials and rare drops.",
        cta: "EXPLORE",
        image:
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
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
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/65 via-black/35 to-transparent"></div>

          <div className="relative h-[360px] sm:h-[440px] lg:h-[520px]">
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
