import { useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "../../App";
import { FaTrashAlt, FaBoxOpen } from "react-icons/fa";
import Swal from "sweetalert2";

const List = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendURL}api/product/list`, {
        headers: { Authorization: localStorage.getItem("adminToken") },
      });
      setProducts(res.data.products || []);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Fetch Failed",
        text: "Failed to load products from the server.",
        confirmButtonColor: "#3085d6",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Remove product with SweetAlert2 configuration
  const handleRemove = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", 
      cancelButtonColor: "#6b7280",  
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Safeguarded endpoint URL routing string pattern match alignment
          const cleanBaseURL = backendURL.endsWith('/') ? backendURL : `${backendURL}/`;
          const res = await axios.post(
            `${cleanBaseURL}api/product/remove`,
            { id },
            {
              headers: { Authorization: localStorage.getItem("adminToken") },
            }
          );

          if (res.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Product has been successfully removed.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            setProducts((prev) => prev.filter((item) => item._id !== id));
          } else {
            Swal.fire("Error!", "Failed to remove the product.", "error");
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Something went wrong while removing product.", "error");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="text-gray-500 mt-4 font-medium">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        
        {/* Header Block Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">All Products</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage and update your inventory list</p>
          </div>
          <div className="self-start sm:self-auto">
            <span className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border border-indigo-100 whitespace-nowrap">
              Total Items: {products.length}
            </span>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
            <FaBoxOpen className="mx-auto text-gray-400 mb-3" size={48} />
            <p className="text-gray-500 font-medium text-lg">No products found.</p>
            <p className="text-sm text-gray-400 mt-1">Add items to see them here.</p>
          </div>
        ) : (
          <>
            {/* 1. MOBILE RESPONSIVE UI: Grid Profile Cards (Visible on mobile screen viewports, hidden on desktop routers) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {products.map((item) => (
                <div 
                  key={item._id} 
                  className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative flex gap-4 hover:border-gray-200 transition"
                >
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={
                        item.image?.[0]
                          ? `${backendURL.replace(/\/$/, "")}${item.image[0]}`
                          : "/noimage.jpg"
                      }
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg border border-gray-100 bg-gray-50"
                    />
                  </div>
                  
                  <div className="flex-grow min-w-0 pr-8">
                    <h3 className="font-bold text-gray-800 text-sm truncate">{item.name}</h3>
                    <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1 text-xs text-gray-500">
                      <span>{item.category}</span>
                      <span className="text-gray-300">•</span>
                      <span>{item.subCategory}</span>
                    </div>

                    <div className="mt-2.5 flex flex-wrap gap-1 items-center">
                      <span className="text-[11px] font-semibold text-gray-400 mr-1">Sizes:</span>
                      {Array.isArray(item.sizes) && item.sizes.length > 0 ? (
                        item.sizes.map((sz, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded font-medium border border-gray-200">
                            {sz}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-gray-400">Bestseller:</span>
                      {item.bestSeller ? (
                        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">Yes</span>
                      ) : (
                        <span className="bg-gray-50 text-gray-400 text-[10px] px-2 py-0.5 rounded-full border border-gray-200">No</span>
                      )}
                    </div>
                  </div>

                  {/* Absolute Mounted Delete Action Trigger */}
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg transition border border-transparent hover:border-red-100"
                    >
                      <FaTrashAlt size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. DESKTOP RESPONSIVE UI: Traditional Viewport Table Layout (Hidden on Mobile viewports) */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 text-left">
                <thead className="bg-gray-50">
                  <tr className="text-gray-700 text-xs font-bold uppercase tracking-wider">
                    <th className="p-4 w-24">Image</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Sub Category</th>
                    <th className="p-4">Size</th>
                    <th className="p-4 text-center">Best Seller</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 text-sm">
                  {products.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50/70 transition duration-150"
                    >
                      <td className="p-4 whitespace-nowrap">
                        <img
                          src={
                            item.image?.[0]
                              ? `${backendURL.replace(/\/$/, "")}${item.image[0]}`
                              : "/noimage.jpg"
                          }
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-lg border border-gray-100 bg-gray-50"
                        />
                      </td>
                      <td className="p-4 font-semibold text-gray-800 max-w-xs truncate">
                        {item.name}
                      </td>
                      <td className="p-4 text-gray-600 whitespace-nowrap">{item.category}</td>
                      <td className="p-4 text-gray-500 whitespace-nowrap">{item.subCategory}</td>
                      <td className="p-4 whitespace-nowrap">
                        {Array.isArray(item.sizes) && item.sizes.length > 0 ? (
                          <div className="flex gap-1 flex-wrap">
                            {item.sizes.map((sz, idx) => (
                              <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded border border-gray-200 font-medium">
                                {sz}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                        {item.bestSeller ? (
                          <span className="inline-flex items-center bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center bg-gray-50 text-gray-400 text-xs px-2.5 py-1 rounded-full border border-gray-200">
                            No
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleRemove(item._id)}
                          className="inline-flex p-2 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg transition duration-150 border border-transparent hover:border-red-100"
                          title="Delete Product"
                        >
                          <FaTrashAlt size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default List;