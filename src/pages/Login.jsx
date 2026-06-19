// src/pages/Login.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/ContextAPI";
import { backendURL } from "../App";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Navigation 
  const navigate = useNavigate();
  //ContextApi is here
  const { storeToken } = useAuth();
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    console.log("Login Form Data :", formData);
    try {
      const res = await fetch(`${backendURL}api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Example: store token in localStorage
      storeToken(data.token);
      console.log(data);
      setSuccess("Login successful!");
      // redirect or update state here
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-[80vh] bg-gray-50 dark:bg-gray-900 px-4">
      <motion.div
        className="w-full max-w-md bg-pink-100 dark:bg-gray-800 shadow-lg p-8 rounded-tl-[100px] rounded-br-[100px]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
          Login to access your account
        </p>

        {/* Error Message */}
        {error && <p className="text-center text-red-500 text-sm mt-3">{error}</p>}
        {success && <p className="text-center text-green-500 text-sm mt-3">{success}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Email Input */}
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400 text-xl" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400 text-xl" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <hr className="flex-grow border-gray-300 dark:border-gray-700" />
            <span className="text-sm text-gray-400">OR</span>
            <hr className="flex-grow border-gray-300 dark:border-gray-700" />
          </div>

          {/* Secondary Buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-gray-700 dark:text-gray-200">
                Login with Google
              </span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
                alt="Facebook"
                className="w-5 h-5"
              />
              <span className="text-gray-700 dark:text-gray-200">
                Login with Facebook
              </span>
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Don’t have an account?{" "}
          <NavLink to="/register" className="text-indigo-600 hover:underline">
            Register
          </NavLink>
        </p>
      </motion.div>
    </section>
  );
};

export default Login;
