import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 👇 Replace these with your own image paths
import Img1 from "../assets/products/hero1.jpg";
import Img2 from "../assets/products/hero3.webp";
import Img3 from "../assets/products/winter3.jpg";

const slides = [
  {
    id: 1,
    img: Img2,
    title: "Winter Collection",
    subtitle: "Warm. Elegant. Timeless.",
  },
  {
    id: 2,
    img: Img1,
    title: "Summer Shawls",
    subtitle: "Soft Fabric, Vibrant Colors",
  },
  {
    id: 3,
    img: Img3,
    title: "Exclusive Embroidery",
    subtitle: "Handcrafted with perfection",
  },
];

const HeroSlideshow = () => {
  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[550px] overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.img
          key={slides[index].id}
          src={slides[index].img}
          alt={slides[index].title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Overlay Text */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
        <motion.h1
          key={slides[index].title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold"
        >
          {slides[index].title}
        </motion.h1>
        <motion.p
          key={slides[index].subtitle}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-3 text-lg md:text-2xl text-gray-200"
        >
          {slides[index].subtitle}
        </motion.p>
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white text-3xl rounded-full px-3 py-1"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white text-3xl rounded-full px-3 py-1"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-white scale-125" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlideshow;
