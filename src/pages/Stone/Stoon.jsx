import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShopContext } from "../../Context/ShopContext";
import { backendURL } from "../../App";

const Stoon = () => {
  const navigate = useNavigate();
  const { products } = useContext(ShopContext);
  const [stoneProducts, setStoneProducts] = useState([]);

  // ✅ Filter products by category + subcategory = "Stone"
  useEffect(() => {
    if (products && products.length > 0) {
      const filtered = products.filter(
        (item) =>
          item.category?.toLowerCase() === "stone" &&
          item.subCategory?.toLowerCase() === "stone"
      );
      setStoneProducts(filtered);
    }
  }, [products]);

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Stone Collection <span className="text-indigo-600">✨</span>
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our elegant <b>Stone</b> products — crafted with style and
            quality.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back
          </button>
        </motion.div>

        {/* Products Grid */}
        {stoneProducts.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No Stone products found.
          </p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {stoneProducts.map((item) => {
              const imageSrc = item.image?.[0]
                ? item.image[0].startsWith("http")
                  ? item.image[0]
                  : `${backendURL.replace(/\/$/, "")}${item.image[0]}`
                : "/noimage.jpg";

              return (
                <motion.div
                  key={item._id}
                  onClick={() => navigate(`/pdetail/${item._id}`, { state: item })}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex flex-col cursor-pointer hover:shadow-xl transition"
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={imageSrc}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 flex-grow line-clamp-2">
                    {item.description || "No description available."}
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent triggering card click
                        navigate(`/pdetail/${item._id}`, { state: item });
                      }}
                      className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Stoon;
