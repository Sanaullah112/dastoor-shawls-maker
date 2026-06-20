// src/components/FreeBooks.jsx
import { motion } from "framer-motion";
import Img1 from "../assets/products/first.jpg"; 
import Img2 from "../assets/products/second.jpg"; 
import Img3 from "../assets/products/third.jpg"; 
import { NavLink } from "react-router-dom";
import { FaTag, FaArrowRight } from "react-icons/fa";

const FreeBooks = () => {
  // Refactored into a structured array to seamlessly handle cascading animations
  const promotionCards = [
    {
      id: 1,
      title: "Stoon",
      route: "/stoon",
      desc: "Premium grade specialized weave patterns manufactured explicitly on request metrics.",
      img: Img1,
      discount: "20% discount",
    },
    {
      id: 2,
      title: "For Women",
      route: "/summer",
      desc: "Delicate light-weight breathing textures optimized for summer collection cycles.",
      img: Img2,
      discount: "20% discount",
    },
    {
      id: 3,
      title: "Winter Blanket",
      route: "/winter",
      desc: "Heavy insulated dual-ply comfortable structural blankets designed for extreme conditions.",
      img: Img3,
      discount: "20% discount",
    },
  ];

  // Framer Motion Orchestration Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Staggers the entry of each card elegantly
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 14 },
    },
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 rounded-md">
            Custom Manufacturing Pipeline
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mt-3 tracking-tight">
            Your Choice, Our <span className="text-indigo-600 dark:text-indigo-400">Order Blueprint</span>
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            All premium product variations are engineered explicitly to order matching strict criteria profiles at highly optimized manufacturing rates.
          </p>
        </motion.div>

        {/* Animated Staggered Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {promotionCards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                scale: 1.015,
                transition: { duration: 0.2, ease: "easeInOut" }
              }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/60 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl dark:hover:shadow-indigo-950/20 transition-shadow duration-300 group"
            >
              <NavLink to={card.route} className="flex-grow flex flex-col">
                {/* Image Display Wrapper */}
                <div className="w-full h-52 bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden mb-5 relative flex items-center justify-center border border-gray-50 dark:border-gray-700/30">
                  <motion.img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-rose-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 shadow-sm flex items-center gap-1">
                    <FaTag className="text-[9px]" />
                    <span>{card.discount}</span>
                  </div>
                </div>

                {/* Typography Information Blocks */}
                <div className="space-y-2 flex-grow">
                  <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-150">
                    {card.title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-3">
                    {card.desc}
                  </p>
                </div>
              </NavLink>

              {/* Functional CTA Interactive Element Anchor */}
              <div className="mt-6 pt-4 border-t border-gray-50 dark:border-gray-700/50 flex items-center justify-between">
                <NavLink 
                  to={card.route}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold rounded-xl text-xs tracking-wide shadow-md shadow-indigo-600/10 transition-all duration-150 transform active:scale-95"
                >
                  <span>Initialize Purchase Blueprint</span>
                  <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform duration-150" />
                </NavLink>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FreeBooks;