// src/pages/NotFound.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";

const NotFound = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(10); // 5 seconds

  useEffect(() => {
    if (count === 0) {
      navigate("/"); // redirect to home
    }
    const timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, navigate]);

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-900 dark:bg-gray-900 px-4">
      <motion.div
        className="text-center bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-10 max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Icon */}
        <FiAlertTriangle className="text-yellow-500 text-6xl mx-auto mb-4" />

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Sorry, the page you're looking for doesn’t exist.
        </p>

        {/* Countdown */}
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Redirecting to <span className="font-semibold">Home</span> in{" "}
          <span className="text-indigo-600">{count}</span> seconds...
        </p>

        {/* Button for manual redirect */}
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
        >
          Go Home Now
        </button>
      </motion.div>
    </section>
  );
};

export default NotFound;
