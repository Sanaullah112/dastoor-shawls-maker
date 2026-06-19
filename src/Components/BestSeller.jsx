import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../App";

const BestSeller = () => {
  const { products, loading } = useContext(ShopContext);
  const navigate = useNavigate();

  // Filter only best seller products
  const bestSellers = products.filter((product) => product.bestSeller === true);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading best sellers...</p>
      </div>
    );
  }

  if (bestSellers.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        No best seller products found.
      </div>
    );
  }

  return (
    <section className="py-10 px-5">
      <h2 className="text-2xl font-semibold text-center text-blue-400 mb-8">
        Best Sellers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bestSellers.map((product) => (
          <motion.div
            key={product._id}
            onClick={() => navigate(`/pdetail/${product._id}`, { state: product })}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-transform p-4 cursor-pointer"
            whileHover={{ scale: 1.03 }}
          >
            <img
                src={
                  product.image?.[0]
                    ? `${backendURL.replace(/\/$/, "")}${
                        product.image[0].startsWith("/") ? product.image[0] : `/${product.image[0]}`
                      }`
                    : "/noimage.jpg"
                }
                alt={product.name}
                className="w-full h-60 object-cover rounded-lg mb-4"
              />

            <h3 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h3>
            <p className="text-gray-500 text-sm">{product.category}</p>
            <p className="text-gray-700 mt-2 text-sm line-clamp-2">
              {product.description.slice(0, 60)}...
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
