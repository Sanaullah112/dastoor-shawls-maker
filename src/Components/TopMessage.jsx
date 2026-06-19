import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai"; 

const TopMessage = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3000); // show after 3s
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-20 left-0 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-3 shadow-lg z-50 flex justify-center items-center px-6"
        >
          <p className="text-sm md:text-base font-medium tracking-wide">
            ✨ The delayed order will be delivered to you as you wish — just the way you want, we’ll prepare it for you.
          </p>

          {/* Close Button */}
          <button
            onClick={() => setShow(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 transition"
            aria-label="Close message"
          >
            <AiOutlineClose size={20} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopMessage;
