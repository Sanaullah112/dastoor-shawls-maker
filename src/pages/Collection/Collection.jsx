import { useState, useContext, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { ShopContext } from "../../Context/ShopContext";
import { backendURL } from "../../App";
import { FaSearch, FaSlidersH, FaBoxOpen } from "react-icons/fa";

// Configure a reusable SweetAlert2 toast notification template
const FilterToast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

const Collection = () => {
  const navigate = useNavigate();
  const { products, loading } = useContext(ShopContext);

  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
    size: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Filter + Search together
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchCategory =
        !filters.category || item.category === filters.category;
      const matchSubCategory =
        !filters.subCategory || item.subCategory === filters.subCategory;
      const matchSize = !filters.size || (item.sizes && item.sizes.includes(filters.size));
      const matchSearch =
        !searchTerm ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCategory && matchSubCategory && matchSize && matchSearch;
    });
  }, [products, filters, searchTerm]);

  // Handle active notifications when filtered sets change to empty
  useEffect(() => {
    if (searchTerm && filteredProducts.length === 0) {
      FilterToast.fire({
        icon: "info",
        title: "No matching search results found.",
      });
    }
  }, [searchTerm, filteredProducts.length]);

  const handleFilterChange = (type, value) => {
    const isRemoving = filters[type] === value;
    
    setFilters((prev) => ({
      ...prev,
      [type]: isRemoving ? "" : value,
    }));

    // Trigger sweetalert toast context updates
    FilterToast.fire({
      icon: "success",
      title: isRemoving 
        ? `Removed ${type} filter` 
        : `Applied ${type}: ${value}`,
      background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
      color: document.documentElement.classList.contains("dark") ? "#fff" : "#000"
    });
  };

  const uniqueCategories = [...new Set(products.map((p) => p.category))];
  const uniqueSubCategories = [...new Set(products.map((p) => p.subCategory))];

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium">Loading collection inventory...</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Explore Our <span className="text-indigo-600 dark:text-indigo-400">Collections</span>
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Discover precision designs sorted efficiently by categories, seasonal variants, or specified fits.
          </p>
        </motion.div>

        {/* Search Bar Module */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-lg shadow-sm rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400 dark:text-gray-500" size={16} />
            </div>
            <input
              type="text"
              placeholder="Search items by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm"
            />
          </div>
        </div>

        {/* Unified Responsive Filter Layout Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5 mb-10 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-bold border-b border-gray-100 dark:border-gray-700 pb-3 text-sm">
            <FaSlidersH className="text-indigo-500" size={16} />
            <span>Refine Inventory Filters</span>
          </div>

          <div className="flex flex-col gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 w-28">
                Category:
              </span>
              <div className="flex flex-wrap gap-2">
                {uniqueCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleFilterChange("category", cat)}
                    className={`px-4 py-1.5 rounded-xl border text-xs font-semibold tracking-wide transition duration-150 select-none ${
                      filters.category === cat
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* SubCategory Filter */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 w-28">
                Sub Category:
              </span>
              <div className="flex flex-wrap gap-2">
                {uniqueSubCategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => handleFilterChange("subCategory", sub)}
                    className={`px-4 py-1.5 rounded-xl border text-xs font-semibold tracking-wide transition duration-150 select-none ${
                      filters.subCategory === sub
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Output Pipeline */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm max-w-md mx-auto">
            <FaBoxOpen className="mx-auto text-gray-300 dark:text-gray-600 mb-3" size={48} />
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">No products match</h3>
            <p className="text-sm text-gray-400 mt-1 px-6">
              Try adjusting your query strings or deselecting filter toggles to search wide records.
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {filteredProducts.map((item) => (
              <motion.div
                key={item._id}
                onClick={() => navigate(`/pdetail/${item._id}`, { state: item })}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/70 shadow-sm overflow-hidden flex flex-col cursor-pointer group hover:shadow-md transition duration-200"
                whileHover={{ y: -4 }}
              >
                {/* Image Container Wrapper */}
                <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 h-56">
                  <img
                    src={
                      item.image?.[0]
                        ? `${backendURL.replace(/\/$/, "")}${item.image[0]}`
                        : "/noimage.jpg"
                    }
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Information Segment */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 font-medium">
                    {item.category} • {item.subCategory}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 line-clamp-2 flex-grow leading-relaxed">
                    {item.description || "No description provided."}
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-gray-50 dark:border-gray-700">
                    <button className="py-2.5 bg-gray-50 hover:bg-indigo-600 text-gray-700 hover:text-white dark:bg-gray-700/50 dark:hover:bg-indigo-600 dark:text-gray-200 w-full rounded-xl text-xs font-bold transition duration-150 tracking-wide">
                      View Product Details
                    </button>
                  </div>
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