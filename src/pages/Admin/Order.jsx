import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { backendURL } from "../../App";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendURL}api/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Delete a single order with SweetAlert2
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete Order?",
      text: "This order will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup: "rounded-2xl shadow-lg",
        confirmButton: "px-5 py-2 rounded-md",
        cancelButton: "px-5 py-2 rounded-md",
      },
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
          toast.error("Failed to delete order.");
        }
      }
    });
  };

  // ✅ Clear all orders with SweetAlert2
  const handleClearAll = async () => {
    Swal.fire({
      title: "Clear All Orders?",
      text: "This will permanently delete all orders. Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Clear All",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup: "rounded-2xl shadow-lg",
        confirmButton: "px-5 py-2 rounded-md",
        cancelButton: "px-5 py-2 rounded-md",
      },
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
          toast.error("Failed to clear all orders.");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Customer Orders</h1>
        {orders.length > 0 && (
          <button
            onClick={handleClearAll}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Clear All
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No orders found.</p>
      ) : (
        <table className="min-w-full border bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-2 px-3 text-left">Product</th>
              <th className="py-2 px-3 text-left">Customer</th>
              <th className="py-2 px-3 text-left">Contact</th>
              <th className="py-2 px-3 text-left">Date</th>
              <th className="py-2 px-3 text-left">Status</th>
              <th className="py-2 px-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const imageSrc =
                order.selectedImage?.startsWith("http")
                  ? order.selectedImage
                  : order.selectedImage
                  ? `${backendURL.replace(/\/$/, "")}${order.selectedImage}`
                  : "/noimage.jpg";

              const statusColors = {
                pending: "bg-yellow-100 text-yellow-700",
                completed: "bg-green-100 text-green-700",
                cancelled: "bg-red-100 text-red-700",
              };

              const status = order.status || "pending";

              return (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={imageSrc}
                        alt={order.productName}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold">{order.productName}</p>
                        <p className="text-sm text-gray-600">
                          {order.productCategory} → {order.productSubCategory}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-3">{order.customer?.fullName}</td>
                  <td className="py-2 px-3">{order.customer?.phone}</td>
                  <td className="py-2 px-3">
                    {order.customer?.date || "N/A"} {order.customer?.time || ""}
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[status]}`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
