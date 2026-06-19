import { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShopContext } from "../../Context/ShopContext";
import { backendURL } from "../../App";

const Collection = () => {
  const navigate = useNavigate();
  const { products, loading } = useContext(ShopContext);

  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
    size: "",
  });

  const [searchTerm, setSearchTerm] = useState(""); // ✅ new state for search

  // ✅ Filter + Search together
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchCategory =
        !filters.category || item.category === filters.category;
      const matchSubCategory =
        !filters.subCategory || item.subCategory === filters.subCategory;
      const matchSize = !filters.size || item.sizes.includes(filters.size);
      const matchSearch =
        !searchTerm ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCategory && matchSubCategory && matchSize && matchSearch;
    });
  }, [products, filters, searchTerm]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value, // toggle filter
    }));
  };

  const uniqueCategories = [...new Set(products.map((p) => p.category))];
  const uniqueSubCategories = [...new Set(products.map((p) => p.subCategory))];
  const uniqueSizes = [
    ...new Set(products.flatMap((p) => (p.sizes ? p.sizes : []))),
  ];

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading products...</p>
      </div>
    );

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Explore Our <span className="text-indigo-600">Collections</span>
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find your perfect shawl by category, subcategory, or size.
          </p>
        </motion.div>

        {/* ✅ Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-10 dark:text-gray-300">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <p className="text-white text-base font-medium text-shadow-amber-500 bg-indigo-600 inline-block px-3 py-1 rounded-md shadow-md">
              Category
            </p>
            {uniqueCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange("category", cat)}
                className={`px-4 py-2 rounded-full border dark:text-gray-400 ${
                  filters.category === cat
                    ? "bg-indigo-600 text-white border-indigo-600 dark:text-white"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* SubCategory Filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <p className="text-white text-base text-shadow-amber-500 font-medium bg-indigo-600 inline-block px-3 py-1 rounded-md shadow-md">
              Sub Category
            </p>
            {uniqueSubCategories.map((sub) => (
              <button
                key={sub}
                onClick={() => handleFilterChange("subCategory", sub)}
                className={`px-4 py-2 rounded-full border dark:text-gray-400 ${
                  filters.subCategory === sub
                    ? "bg-indigo-600 text-white border-indigo-600 dark:text-white"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {filteredProducts.map((item) => (
              <motion.div
                key={item._id}
                onClick={() => navigate(`/pdetail/${item._id}`, { state: item })}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex flex-col cursor-pointer hover:shadow-lg transition"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={
                      item.image?.[0]
                        ? `${backendURL.replace(/\/$/, "")}${item.image[0]}`
                        : "/noimage.jpg"
                    }
                    alt={item.name}
                  className="w-full h-48 object-cover rounded mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 flex-grow">
                  {item.description?.slice(0, 60)}...
                </p>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 w-full">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Collection;
