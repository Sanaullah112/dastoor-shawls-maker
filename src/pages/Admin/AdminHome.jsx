import { motion } from "framer-motion";
import adminImg from "../../assets/products/anwar.jpg";
import { useEffect, useState } from "react";
import { backendURL } from "../../App";
import axios from "axios";

const AdminHome = () => {
  const [admin] = useState({
    name: "Sanaullah",
    role: "Administrator",
    email: "admin@dastoorshawls.com",
    image: adminImg,
  });

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalCustomers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${backendURL}api/admin/stats`);
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  const statCards = [
    { title: "Total Products", value: stats.totalProducts },
    { title: "Orders Placed", value: stats.totalOrders },
    { title: "Pending Orders", value: stats.pendingOrders },
    { title: "Customers", value: stats.totalCustomers },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6 md:p-10">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Welcome Back, {admin.name} 👋
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your store, track sales, and view analytics — all in one place.
        </p>
      </motion.div>

      {/* Admin Card */}
      <motion.div
        className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={admin.image}
          alt="Admin"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{admin.name}</h2>
          <p className="text-gray-500">{admin.role}</p>
          <p className="text-gray-400 text-sm mt-1">{admin.email}</p>
          <div className="mt-4 flex gap-3">
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Edit Profile
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              Settings
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {statCards.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-md rounded-xl py-6 px-5 text-center hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-3xl font-bold text-blue-800">{item.value}</h3>
            <p className="text-gray-500 mt-2">{item.title}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <div className="mt-14 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} Dastoor Shawls Maker — Admin Dashboard
        </p>
      </div>
    </div>
  );
};

export default AdminHome;
