import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../App";
import Swal from "sweetalert2";
import { FaFire, FaEye, FaShoppingBag } from "react-icons/fa";

const BestSeller = () => {
  // Using global react context state: whenever products update here, this updates instantly without refresh!
  const { products, loading } = useContext(ShopContext);
  const navigate = useNavigate();

  // Dynamically filter best sellers directly from the reactive context state
  const bestSellers = products.filter((product) => product.bestSeller === true || product.bestSeller === "true");

  // Quick SweetAlert2 Preview Panel for immediate item inspecting
  const openQuickPreview = (e, product) => {
    e.stopPropagation(); // Stop parent onClick from navigating away instantly
    
    const imgUrl = product.image?.[0]
      ? `${backendURL.replace(/\/$/, "")}${product.image[0].startsWith("/") ? product.image[0] : `/${product.image[0]}`}`
      : "/noimage.jpg";

    Swal.fire({
      title: `<span class="text-xl font-bold text-gray-800">${product.name}</span>`,
      html: `
        <div class="text-left space-y-3">
          <div class="w-full h-56 rounded-xl overflow-hidden bg-gray-100 mb-4 border">
            <img src="${imgUrl}" alt="${product.name}" class="w-full h-full object-cover" />
          </div>
          <span class="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-md uppercase mb-2">
            ${product.category}
          </span>
          <p class="text-gray-600 text-sm leading-relaxed">${product.description || 'No description available.'}</p>
          <div class="pt-2 border-t text-xs text-gray-400 font-medium">
            Variant Type: <span class="text-gray-600 font-semibold">${product.subCategory || "Standard"}</span>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: '<span class="flex items-center gap-2 font-bold text-sm"><i class="fas fa-shopping-bag"></i> View Details</span>',
      cancelButtonText: 'Close',
      confirmButtonColor: "#4f46e5", 
      cancelButtonColor: "#6b7280",
      customClass: {
        popup: 'rounded-3xl p-5 shadow-xl border border-gray-100',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/pdetail/${product._id}`, { state: product });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-72 space-y-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        <p className="text-gray-400 text-sm font-medium tracking-wide">Syncing catalog inventory...</p>
      </div>
    );
  }

  if (bestSellers.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-3xl max-w-xl mx-auto my-10 px-4">
        <p className="text-gray-400 font-medium text-base">No premium best seller catalog markers live right now.</p>
        <p className="text-xs text-gray-400/70 mt-1">When an item is tagged as a best seller by Admin, it will drop here live.</p>
      </div>
    );
  }

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-md mx-auto mb-12 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-100/60">
          <FaFire size={12} className="animate-pulse" />
          <span>Trending Collections</span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
          Our Best Sellers
        </h2>
        <p className="text-sm text-gray-500 font-medium">
          The most popular luxury shawls and fabrics added directly by our artisans.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bestSellers.map((product) => (
          <motion.div
            key={product._id}
            onClick={() => navigate(`/pdetail/${product._id}`, { state: product })}
            className="group bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl transition-all duration-300 p-4 cursor-pointer relative overflow-hidden flex flex-col justify-between"
            whileHover={{ y: -6 }}
          >
            <div>
              {/* Image Container with Actions overlay */}
              <div className="w-full h-64 bg-gray-50 rounded-xl overflow-hidden mb-4 border border-gray-100 relative">
                <img
                  src={
                    product.image?.[0]
                      ? `${backendURL.replace(/\/$/, "")}${
                          product.image[0].startsWith("/") ? product.image[0] : `/${product.image[0]}`
                        }`
                      : "/noimage.jpg"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Micro Actions Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => openQuickPreview(e, product)}
                    className="p-3 bg-white/95 text-gray-800 rounded-xl font-bold shadow-md hover:bg-indigo-600 hover:text-white transition transform hover:scale-110"
                    title="Quick Preview"
                  >
                    <FaEye size={14} />
                  </button>
                  <div className="p-3 bg-white/95 text-indigo-600 rounded-xl font-bold shadow-md pointer-events-none transform translate-y-0">
                    <FaShoppingBag size={14} />
                  </div>
                </div>
              </div>

              {/* Text Info Elements */}
              <div className="space-y-1 px-1">
                <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider block">
                  {product.category}
                </span>
                <h3 className="text-base font-extrabold text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-xs font-medium line-clamp-2 pt-1 leading-relaxed">
                  {product.description || "Premium processed artisan creation designed for high durability and timeless feel."}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 font-semibold px-1">
              <span>View details</span>
              <span className="text-indigo-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BestSeller;