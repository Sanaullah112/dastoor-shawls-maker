import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Import your image paths
import Img1 from "../assets/products/hero1.jpg";
import Img2 from "../assets/products/hero3.webp";
import Img3 from "../assets/products/winter3.jpg";

const slides = [
  {
    id: 1,
    img: Img2,
    title: "Winter Collection",
    subtitle: "Warm. Elegant. Timeless.",
    tagline: "PREMIUM PASHMINA SHAWLS",
  },
  {
    id: 2,
    img: Img1,
    title: "Summer Shawls",
    subtitle: "Soft Fabric, Vibrant Colors",
    tagline: "LIGHTWEIGHT LUXURY WEAVES",
  },
  {
    id: 3,
    img: Img3,
    title: "Exclusive Embroidery",
    subtitle: "Handcrafted with perfection",
    tagline: "ARTISAN CRAFTSMANSHIP",
  },
];

const HeroSlideshow = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = Next, -1 = Prev

  // Auto-slide every 6 seconds for optimal reading pace
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Modern Slide/Scale variants for a cinematic background shift
  const slideVariants = {
    enter: (dir) => ({
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir) => ({
      opacity: 0,
      scale: 0.98,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
    }), // Fixed: Corrected trailing closure bracket error here
  };

  // Text container cascading mechanics
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 15 },
    },
  };

  return (
    <div className="relative w-full h-[600px] bg-gray-950 overflow-hidden select-none">
      
      {/* Background Slideshow Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slides[index].img}
              alt={slides[index].title}
              className="w-full h-full object-cover select-none pointer-events-none"
            />
            {/* Dark Gradient Overlay for optimal legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70 md:bg-gradient-to-t md:from-black/80 md:via-black/30 md:to-black/50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Cinematic Text Content Layer */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center text-white px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="max-w-3xl space-y-4"
          >
            <motion.span 
              variants={textItemVariants}
              className="inline-block text-xs md:text-sm font-bold tracking-[0.25em] text-indigo-400 uppercase bg-indigo-950/40 border border-indigo-500/30 backdrop-blur-sm px-4 py-1.5 rounded-full"
            >
              {slides[index].tagline}
            </motion.span>

            <motion.h1
              variants={textItemVariants}
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight drop-shadow-sm text-white"
            >
              {slides[index].title}
            </motion.h1>

            <motion.p
              variants={textItemVariants}
              className="text-base sm:text-xl md:text-2xl text-gray-300 font-medium tracking-wide max-w-xl mx-auto"
            >
              {slides[index].subtitle}
            </motion.p>

            <motion.div variants={textItemVariants} className="pt-4">
              <button className="px-6 py-3 bg-white text-gray-900 font-bold rounded-xl text-sm shadow-lg hover:bg-indigo-600 hover:text-white transition duration-300 transform active:scale-95">
                Explore Collection
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sleek Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/20 hover:bg-indigo-600/90 border border-white/10 text-white rounded-xl flex items-center justify-center backdrop-blur-md shadow-md transition transform active:scale-90 group"
      >
        <FaChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/20 hover:bg-indigo-600/90 border border-white/10 text-white rounded-xl flex items-center justify-center backdrop-blur-md shadow-md transition transform active:scale-90 group"
      >
        <FaChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Dynamic Progress Indicator Strip / Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "bg-white w-8" : "bg-white/40 w-2 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlideshow;