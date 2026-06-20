// src/pages/Registration.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../Context/ContextAPI";
import axios from "axios";
import { backendURL } from "../App";

const Registration = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load countries
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${backendURL}api/product/`);
        setCountries(res.data);
      } catch (err) {
        console.error("Error loading countries:", err);
        setCountries([]);
      }
    };
    load();
  }, []);

  // Handle country change -> load cities
  const handleCountryChange = async (e) => {
    const id = e.target.value;

    setFormData(prev => ({
      ...prev,
      country: id,
      city: "" // reset city
    }));

    try {
      const res = await fetch(`${backendURL}api/product/cities/${id}`);
      const data = await res.json();
      setCities(data);
    } catch (err) {
      console.log("Error loading cities:", err);
      setCities([]);
    }
  };

  // Handle other inputs
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const navigate = useNavigate();
  const { storeToken } = useAuth();

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${backendURL}api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      storeToken(data.token);
      setSuccess("Registration successful! Please login.");

      setFormData({
        name: "",
        email: "",
        password: "",
        country: "",
        city: "",
      });

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-[80vh] bg-gray-50 dark:bg-gray-900 px-4">
      <motion.div
        className="w-full max-w-md bg-pink-100 dark:bg-gray-800 rounded-2xl shadow-lg p-8 rounded-tl-[100px] rounded-br-[100px]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Create Account 🚀
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
          Join us to explore amazing books
        </p>

        {error && <p className="text-center text-red-500 text-sm mt-3">{error}</p>}
        {success && <p className="text-center text-green-500 text-sm mt-3">{success}</p>}

        <form onSubmit={handleSubmit} autoComplete="off" className="mt-8 space-y-5">

          {/* Name */}
          <div className="relative">
            <FiUser className="absolute top-3 left-3 text-gray-400 text-xl" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-900"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400 text-xl" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-900"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400 text-xl" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-900"
            />
          </div>

          {/* Country Select */}
          <select
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-900"
          >
            <option value="">Select country</option>
            {countries.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

          {/* City Select */}
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-900"
            disabled={!formData.country}
          >
            <option value="">Select city</option>
            {cities.map(city => (
              <option key={city._id} value={city._id}>{city.name}</option>
            ))}
          </select>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <NavLink to="/login" className="text-indigo-600 hover:underline">
            Login
          </NavLink>
        </p>
      </motion.div>
    </section>
  );
};

export default Registration;
