import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../../App";

const AdminLogin = ({ setToken }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save token to localStorage
  const storeToken = (token) => {
    localStorage.setItem("adminToken", token);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${backendURL}api/auth/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Parse JSON safely
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token
      storeToken(data.token);
      setToken(data.token);

      setSuccess("Login successful!");
      setTimeout(() => {
        navigate("/admin"); // redirect to admin dashboard
        window.location.reload(); // reload to update UI (optional)
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel Login</h1>

        {error && <p className="text-center text-red-500 text-sm mt-3">{error}</p>}
        {success && <p className="text-center text-green-500 text-sm mt-3">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-0"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-0"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
            disabled={loading}
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
