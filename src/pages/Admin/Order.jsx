import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { backendURL } from "../../App";
import { FaTrashAlt, FaInbox, FaSpinner } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendURL}api/orders`);
      setOrders(res.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load active orders from the database.",
        confirmButtonColor: "#4f46e5",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Delete a single order with SweetAlert2
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete Order?",
      text: "This order record will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", 
      cancelButtonColor: "#6b7280",  
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${backendURL}api/orders/${id}`);
          setOrders((prev) => prev.filter((order) => order._id !== id));

          Swal.fire({
            title: "Deleted!",
            text: "The order has been removed successfully.",
            icon: "success",
            timer: 1800,
            showConfirmButton: false,
          });
        } catch (err) {
          console.error("Error deleting order:", err);
          Swal.fire({
            icon: "error",
            title: "Action Failed",
            text: "Something went wrong while trying to remove this order.",
          });
        }
      }
    });
  };

  // Clear all orders with SweetAlert2
  const handleClearAll = async () => {
    Swal.fire({
      title: "Clear All Orders?",
      text: "This will permanently wipe all order database records. Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Clear All",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${backendURL}api/orders/clear`);
          setOrders([]);

          Swal.fire({
            title: "Cleared!",
            text: "All orders have been deleted successfully.",
            icon: "success",
            timer: 1800,
            showConfirmButton: false,
          });
        } catch (err) {
          console.error("Error clearing orders:", err);
          Swal.fire({
            icon: "error",
            title: "Action Failed",
            text: "Could not clear all entries. Please try again.",
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 bg-gray-50/50">
        <FaSpinner className="animate-spin text-indigo-600 mb-4" size={32} />
        <p className="text-gray-500 font-medium">Retrieving customer orders...</p>
      </div>
    );
  }

  // Base configurations for reusable status chips
  const statusColors = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        
        {/* Header Block Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-5 border-b border-gray-100">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Customer Orders</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Track incoming purchases, status changes, and invoices</p>
          </div>
          {orders.length > 0 && (
            <button
              onClick={handleClearAll}
              className="w-full sm:w-auto text-center bg-rose-50 text-rose-600 border border-rose-200 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg hover:bg-rose-100 transition duration-150 shadow-sm"
            >
              Clear All Orders
            </button>
          )}
        </div>

        {/* Orders Layout Control Switch */}
        {orders.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
            <FaInbox className="mx-auto text-gray-300 mb-3" size={44} />
            <p className="text-gray-500 font-medium text-lg">No current orders found</p>
            <p className="text-sm text-gray-400 mt-0.5">When users make requests, they will pop up here.</p>
          </div>
        ) : (
          <>
            {/* 1. MOBILE RESPONSIVE UI: Info Profile Cards (Visible on screens smaller than large desktop viewports) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
              {orders.map((order) => {
                const imageSrc = order.selectedImage?.startsWith("http")
                  ? order.selectedImage
                  : order.selectedImage
                  ? `${backendURL.replace(/\/$/, "")}${order.selectedImage}`
                  : "/noimage.jpg";
                const status = order.status || "pending";

                return (
                  <div key={order._id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative flex flex-col justify-between hover:border-gray-200 transition">
                    
                    {/* Top Row: Info & Action Target */}
                    <div className="flex gap-3 mb-3">
                      <img
                        src={imageSrc}
                        alt={order.productName}
                        className="w-14 h-14 object-cover rounded-lg border border-gray-100 bg-gray-50 flex-shrink-0"
                      />
                      <div className="min-w-0 pr-8">
                        <p className="font-bold text-gray-800 text-sm truncate">{order.productName}</p>
                        <p className="text-[10px] text-indigo-600 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded inline-block mt-1 font-medium">
                          {order.productCategory} → {order.productSubCategory}
                        </p>
                      </div>
                    </div>

                    {/* Meta Breakdown Section */}
                    <div className="space-y-1.5 border-t border-gray-50 pt-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-medium">Customer:</span>
                        <span className="text-gray-800 font-semibold">{order.customer?.fullName || "Guest"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-medium">Contact:</span>
                        <span className="text-gray-600 font-mono">{order.customer?.phone || "—"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-medium">Placed on:</span>
                        <span className="text-gray-500 text-right">
                          {order.customer?.date || "N/A"} <span className="text-gray-300 ml-1">{order.customer?.time || ""}</span>
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-1.5">
                        <span className="text-gray-400 font-medium">Status:</span>
                        <span className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full border ${statusColors[status] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Absolute Delete Action Hook Trigger */}
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg transition"
                      >
                        <FaTrashAlt size={14} />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* 2. DESKTOP RESPONSIVE UI: High-Density Table System (Visible on Desktop Wide screen spaces) */}
            <div className="hidden lg:block overflow-x-auto rounded-xl border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 text-left">
                <thead className="bg-gray-50">
                  <tr className="text-gray-700 text-xs font-bold uppercase tracking-wider">
                    <th className="py-4 px-4">Product Details</th>
                    <th className="py-4 px-4">Customer</th>
                    <th className="py-4 px-4">Contact</th>
                    <th className="py-4 px-4">Date & Time</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-100 text-sm">
                  {orders.map((order) => {
                    const imageSrc = order.selectedImage?.startsWith("http")
                      ? order.selectedImage
                      : order.selectedImage
                      ? `${backendURL.replace(/\/$/, "")}${order.selectedImage}`
                      : "/noimage.jpg";
                    const status = order.status || "pending";

                    return (
                      <tr key={order._id} className="hover:bg-gray-50/70 transition duration-150">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={imageSrc}
                              alt={order.productName}
                              className="w-14 h-14 object-cover rounded-lg border border-gray-100 bg-gray-50"
                            />
                            <div>
                              <p className="font-semibold text-gray-800">{order.productName}</p>
                              <p className="text-xs text-indigo-600 bg-indigo-50/50 border border-indigo-100 px-1.5 py-0.5 rounded inline-block mt-0.5 font-medium">
                                {order.productCategory} → {order.productSubCategory}
                              </p>
                            </div>
                          </div>
                        </td>
                        
                        <td className="py-4 px-4 font-medium text-gray-800 whitespace-nowrap">
                          {order.customer?.fullName || "Guest Customer"}
                        </td>
                        
                        <td className="py-4 px-4 text-gray-600 font-mono text-xs whitespace-nowrap">
                          {order.customer?.phone || "—"}
                        </td>
                        
                        <td className="py-4 px-4 text-gray-500 text-xs whitespace-nowrap">
                          <span className="block font-medium text-gray-700">
                            {order.customer?.date || "N/A"}
                          </span>
                          <span className="text-gray-400">
                            {order.customer?.time || ""}
                          </span>
                        </td>
                        
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                              statusColors[status] || "bg-gray-50 text-gray-600 border-gray-200"
                            }`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                        </td>
                        
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          <button
                            onClick={() => handleDelete(order._id)}
                            className="inline-flex p-2 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg transition duration-150"
                            title="Delete Order"
                          >
                            <FaTrashAlt size={15} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;