/* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react";

// const images = [
//   "https://images.unsplash.com/photo-1649807479468-40011b31ee09?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1605475723788-08c82657b6af?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1670014773310-387f8a70a4af?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// ];

// export default function AutoSlider() {
//   const [current, setCurrent] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     if (isHovered) return;

//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length);
//     }, 3000); // Change every 3s

//     return () => clearInterval(interval);
//   }, [isHovered]);

//   const prevSlide = () => {
//     setCurrent((prev) => (prev - 1 + images.length) % images.length);
//   };

//   const nextSlide = () => {
//     setCurrent((prev) => (prev + 1) % images.length);
//   };

//   return (
//     <div
//       className="w-full h-[90vh] overflow-hidden relative"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Slides */}
//       {images.map((img, index) => (
//         <img
//           key={index}
//           src={img}
//           alt={`Slider image ${index + 1}`}
//           className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
//             index === current ? "opacity-100" : "opacity-0"
//           }`}
//         />
//       ))}

//       {/* Navigation Arrows */}
//       <button
//         className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white text-3xl bg-black/50 p-2 rounded-full hover:bg-black/70"
//         onClick={prevSlide}
//         aria-label="Previous Slide"
//       >
//         ‹
//       </button>
//       <button
//         className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white text-3xl bg-black/50 p-2 rounded-full hover:bg-black/70"
//         onClick={nextSlide}
//         aria-label="Next Slide"
//       >
//         ›
//       </button>

//       {/* Dot Indicators */}
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrent(index)}
//             aria-label={`Go to slide ${index + 1}`}
//             className={`w-3 h-3 rounded-full ${
//               index === current ? "bg-white" : "bg-gray-400"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


//----------------------------------------------------------------------------------------------------



import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const images = [
  {
    url: "https://images.unsplash.com/photo-1649807479468-40011b31ee09?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Professional Excavation Services",
    description: "Expert earthmoving and site preparation"
  },
  {
    url: "https://images.unsplash.com/photo-1605475723788-08c82657b6af?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Heavy Machinery Operations",
    description: "State-of-the-art equipment for any project"
  },
  {
    url: "https://images.unsplash.com/photo-1670014773310-387f8a70a4af?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Quality Construction Solutions",
    description: "Building foundations for your success"
  },
];

export default function EnhancedSlider() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState('next');
  const progressRef = useRef();

  useEffect(() => {
    if (!isPlaying) {
      setProgress(0);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrent((current) => (current + 1) % images.length);
          return 0;
        }
        return prev + (100 / 30); // 3 seconds = 30 intervals of 100ms
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isPlaying, current]);

  const prevSlide = () => {
    setDirection('prev');
    setProgress(0);
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setDirection('next');
    setProgress(0);
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index) => {
    setDirection(index > current ? 'next' : 'prev');
    setProgress(0);
    setCurrent(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) setProgress(0);
  };

  return (
    <div
      className="relative w-full h-[100vh] overflow-hidden bg-gray-950 group"

    >
      {/* Background Images with Enhanced Transitions */}
      <div className="relative w-full h-full">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === current
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
              }`}
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center mt-16 justify-center">
        <div className="text-center text-white max-w-4xl px-6">
          <h1
            key={`title-${current}`}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-shadow-2xl shadow-black animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            {images[current].title}
          </h1>
          <p
            key={`desc-${current}`}
            className="text-lg md:text-xl lg:text-2xl font-light opacity-90 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            {images[current].description}
          </p>

        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className={`absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 '
          }`}
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        className={`absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 '
          }`}
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Enhanced Dot Indicators with Progress */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <div className="flex gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="relative group"
            >
              <div className={`w-5 h-3 rounded-full transition-all duration-300 ${index === current
                ? "bg-white scale-125 shadow-lg"
                : "bg-white/50 hover:bg-white/75 hover:scale-110"
                }`} />
              {index === current && isPlaying && (
                <div
                  className="absolute inset-0 rounded-full border-2 border-black"
                  style={{
                    background: `conic-gradient(red ${progress * 3.6}deg, transparent 0deg)`
                  }}
                />
              )}
              <div className="absolute -inset-2 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
            </button>
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="ml-4 p-2 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
        {current + 1} / {images.length}
      </div>

      {/* Progress Bar */}
      {isPlaying && (
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-20">
          <div
            className="h-full bg-red-500 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}




    </div>
  );
}