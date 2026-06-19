// src/components/Banner.jsx
import { motion } from "framer-motion";
import bookImg from "../assets/products/book3.jpg";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center gap-10">
        
        {/* Left side text */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-snug">
            Hello, Welcomes Here To Dastoor Shawls Maker{" "}
            <span className="text-indigo-600">You can buy with 20% Discount!!!</span>
          </h1>

          {/* Email input & button */}
          <div className="mt-8 flex justify-center lg:justify-start">
            <div className="flex items-center max-w-md rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden shadow-sm">
              <button className="bg-indigo-600 text-white px-5 py-2  bg-gradient-to-r from-blue-500 to-purple-500  bg-[length:200%_100%] bg-right transition-all duration-500 hover:bg-left" onClick={()=>navigate('/about')}>
                More details...
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right side image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={bookImg}
            alt="Books"
            className="w-72 md:w-96 object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
