/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";

const LuxuryAboutPage = () => {
  const heroRef = useRef(null);
  const teamRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Add Google Fonts
    const link1 = document.createElement("link");
    link1.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap";
    link1.rel = "stylesheet";
    document.head.appendChild(link1);

    const link2 = document.createElement("link");
    link2.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap";
    link2.rel = "stylesheet";
    document.head.appendChild(link2);

    // Parallax scroll effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all animated elements
    const animatedElements = document.querySelectorAll("[data-animate]");
    animatedElements.forEach((el) => observer.observe(el));

    window.addEventListener("scroll", handleScroll);

    return () => {
      document.head.removeChild(link1);
      document.head.removeChild(link2);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const teamMembers = [
    {
      name: "Elena Rosetti",
      role: "Lead Designer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop&crop=face",
      specialty: "Minimalist Aesthetics"
    },
    {
      name: "Marcus Chen",
      role: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face",
      specialty: "Sustainable Innovation"
    },
    {
      name: "Sofia Laurent",
      role: "Experience Designer",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face",
      specialty: "User-Centered Design"
    },
    {
      name: "David Thompson",
      role: "Design Strategist",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",
      specialty: "Brand Architecture"
    }
  ];

  const awards = [
    {
      name: "Good Design Award",
      logo: "https://images-workbench.99static.com/bja9KgE5G97WbTAamMvECp3k4jE=/99designs-contests-attachments/120/120719/attachment_120719539",
      year: "2024"
    },
    {
      name: "Red Dot Award",
      logo: "https://images-workbench.99static.com/34wwYQGg-eUQ6Mwrd-EeINokPJg=/99designs-contests-attachments/93/93513/attachment_93513935",
      year: "2023"
    },
    {
      name: "IF Design Award",
      logo: "https://images-workbench.99static.com/--qWUBDsuMxlSWcu6bUa733PY2o=/99designs-contests-attachments/132/132483/attachment_132483398",
      year: "2024"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 overflow-x-hidden">
      <style jsx>{`
        .playfair {
          font-family: "Playfair Display", serif;
        }
        .inter {
          font-family: "Inter", sans-serif;
        }

        /* Advanced Animations */
        .slide-in-left {
          animation: slideInLeft 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
          opacity: 0;
          transform: translateX(-60px);
        }

        .slide-in-right {
          animation: slideInRight 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
          opacity: 0;
          transform: translateX(60px);
        }

        .fade-in-up {
          animation: fadeInUp 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
          transform: translateY(60px);
        }

        .scale-in {
          animation: scaleIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
          transform: scale(0.8);
        }

        .rotate-in {
          animation: rotateIn 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
          transform: rotate(-5deg) scale(0.9);
        }

        .typewriter {
          overflow: hidden;
          border-right: 3px solid #1e293b;
          white-space: nowrap;
          animation: typing 3s steps(40, end),
            blink-caret 0.75s step-end infinite;
        }

        @keyframes slideInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes rotateIn {
          to {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
        }

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink-caret {
          from,
          to {
            border-color: transparent;
          }
          50% {
            border-color: #1e293b;
          }
        }

        /* Enhanced hover effects */
        .team-card {
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
        }

        .team-card:hover {
          transform: translateY(-20px) rotateX(5deg);
          box-shadow: 0 40px 80px -12px rgba(30, 41, 59, 0.25);
        }

        .team-card:hover .card-overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .card-overlay {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s ease;
        }

        /* Advanced button effects */
        .btn-luxury {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
        }

        .btn-luxury::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .btn-luxury:hover::before {
          left: 100%;
        }

        .btn-luxury:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 20px 40px rgba(30, 41, 59, 0.2);
        }

        /* Floating animation */
        .float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        /* Pulse effect */
        .pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite alternate;
        }

        @keyframes pulseGlow {
          from {
            box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
          }
          to {
            box-shadow: 0 0 40px rgba(37, 99, 235, 0.6);
          }
        }

        /* Morphing background */
        .morphing-bg {
          background: linear-gradient(-45deg, #f8fafc, #e2e8f0);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Text reveal effect */
        .text-reveal {
          background: linear-gradient(
            90deg,
            #1e293b 0%,
            #334155 50%,
            #1e293b 100%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: textShine 3s linear infinite;
        }

        @keyframes textShine {
          to {
            background-position: 200% center;
          }
        }

        /* Stagger animation delays */
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        .delay-800 {
          animation-delay: 0.8s;
        }

        /* Parallax elements */
        .parallax-slow {
          transform: translateY(${scrollY * 0.2}px);
        }

        .parallax-fast {
          transform: translateY(${scrollY * 0.5}px);
        }

        /* 3D hover cards */
        .card-3d {
          perspective: 1000px;
        }

        .card-3d-inner {
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .card-3d:hover .card-3d-inner {
          transform: rotateY(180deg);
        }

        .card-front,
        .card-back {
          backface-visibility: hidden;
        }

        .card-back {
          transform: rotateY(180deg);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>

      {/* Enhanced Hero Section with parallax */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 px-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 morphing-bg opacity-20"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-100 to-slate-200 rounded-full blur-3xl opacity-30 float"></div>
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full blur-3xl opacity-20 float"
          style={{ animationDelay: "3s" }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="slide-in-left">
                <h1 className="playfair text-6xl lg:text-8xl font-bold text-slate-800 leading-tight">
                  ÉLITE
                  <br />
                  <span className="text-reveal">LUXURY HAVEN</span>
                </h1>
              </div>

              <div className="slide-in-left delay-300 space-y-6">
                <p className="inter text-xl text-slate-600 leading-relaxed max-w-md font-light">
                  At LuxuryHaven,{" "}
                  <span className="font-semibold text-emerald-700">
                    simplicity and craftsmanship
                  </span>{" "}
                  come together to shape everyday luxury. Guided by timeless
                  design principles, we create meaningful spaces.
                </p>
                <p className="inter text-lg text-slate-600 leading-relaxed max-w-md">
                  Design is a way of life where{" "}
                  <span className="italic">
                    purpose, feeling, and Italian craftsmanship
                  </span>{" "}
                  come together to shape calm, meaningful spaces that feel as
                  good as they look.
                </p>
              </div>

              <div className="slide-in-left delay-500">
                <button
                  onClick={() => scrollToSection(teamRef)}
                  className="btn-luxury group inline-flex items-center px-10 py-5 bg-gradient-to-r from-slate-800 to-slate-900 text-white inter font-semibold text-sm tracking-wider hover:text-black hover:from-white hover:to-stone-800 transition-all duration-500 rounded-full"
                >
                  LEARN MORE
                  <svg
                    className="w-5 h-5 ml-3 group-hover:translate-x-2 group-hover:rotate-12 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="slide-in-right delay-200">
              <div className="relative float">
                <img
                  src="kit_2025.jpg"
                  alt="Luxury team workspace"
                  className="w-full h-[500px] object-cover object-center rounded-3xl shadow-2xl transform hover:scale-205 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-teal-500/20 rounded-3xl"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-teal-200 to-slate-400 rounded-full blur-xl opacity-60 pulse-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Section Divider */}
      <div className="relative py-16">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent scale-in"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-white p-4 rounded-full shadow-lg scale-in delay-300">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-slate-500 rounded-full pulse-glow"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Team Section */}
      <section ref={teamRef} className="py-20 px-6" data-animate="team">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8 fade-in-up">
              <div>
                <h2 className="playfair text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
                  DESIGNERS{" "}
                  <em className="text-slate-700 text-reveal">
                    BEHIND
                    <br />
                    THE VISION
                  </em>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-slate-500 mb-8 scale-in delay-300"></div>
                <p className="inter text-xl text-slate-600 leading-relaxed font-light">
                  Each member of our team brings a{" "}
                  <span className="font-semibold text-teal-700">
                    unique perspective
                  </span>
                  , bound by a shared passion for thoughtful design and timeless
                  quality. Together, we shape spaces that feel personal,
                  purposeful, and beautifully made.
                </p>
              </div>

              <div className="space-y-6 inter text-sm text-slate-500 fade-in-up delay-400">
                <p className="leading-relaxed">
                  Founded in Italy, LuxuryHaven grew from its base that is
                  intrinsic to its character—
                  <span className="font-semibold">responsible innovation</span>,
                  sustainable design, and authentic Italian craftsmanship.
                </p>
                <p className="leading-relaxed">
                  Our design philosophy centers on creating{" "}
                  <span className="italic">timeless pieces</span> that transcend
                  trends and speak to the soul of modern living.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="team-card bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl card-3d"
                  style={{
                    animationDelay: `${index * 0.15}s`
                  }}
                >
                  <div className="card-3d-inner">
                    <div className="card-front">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110"
                        />
                      </div>
                      <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 relative">
                        <h3 className="inter font-bold text-slate-800 text-lg mb-1">
                          {member.name}
                        </h3>
                        <p className="inter text-sm text-slate-700 font-medium mb-2">
                          {member.role}
                        </p>
                        <div className="card-overlay">
                          <p className="inter text-xs text-slate-500 italic">
                            {member.specialty}
                          </p>
                          <div className="mt-3 flex space-x-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Awards Section */}
      <section
        className="py-24 px-6 bg-gradient-to-br from-slate-100 to-teal-100 relative overflow-hidden"
        data-animate="awards"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-y-2"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="playfair text-5xl lg:text-6xl font-bold text-slate-800 mb-6 scale-in">
              THE <em className="text-teal-700 text-reveal">AWARDS</em>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-slate-500 mx-auto mb-8 scale-in delay-300"></div>
            <p className="inter text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light fade-in-up delay-400">
              LuxuryHaven's designs are{" "}
              <span className="font-semibold text-teal-700">
                globally awarded
              </span>{" "}
              for their timeless simplicity and purposeful innovation,
              recognized by the world's most prestigious design institutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {awards.map((award, index) => (
              <div
                key={index}
                className="text-center group scale-in"
                style={{ animationDelay: `${index * 0.2 + 0.6}s` }}
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 pulse-glow">
                    <img
                      src={award.logo}
                      alt={award.name}
                      className="h-16 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {award.year}
                  </div>
                </div>
                <h3 className="inter font-semibold text-slate-800 group-hover:text-teal-700 transition-colors duration-300">
                  {award.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA Section */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0"></div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4
                  }s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >ÉLITE</div>
          ))}
        </div>
      </section>

      {/* Floating action button */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-900 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50 pulse-glow">
        Help
        <svg
          className="w-8 h-8 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default LuxuryAboutPage;
