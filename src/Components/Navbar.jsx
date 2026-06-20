import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../Context/ContextAPI";
import logo from "../assets/products/logo.jpg";
import { FaToggleOn } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const { loggedIn, removeToken } = useAuth(); // Assuming removeToken is exposed here, or handle it via routing

  const linkClasses = ({ isActive }) =>
    isActive
      ? "text-red-500 dark:text-red-400 hover:text-red-700 font-bold border-b-2 border-indigo-600 transition-all duration-150"
      : "text-gray-700 dark:text-gray-200 hover:text-indigo-500 transition-colors duration-150";

  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Dark Mode System Registry
  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // SweetAlert2 Logout Confirmation
  const handleLogoutClick = (e) => {
    e.preventDefault(); // Stop default navigation link behavior
    setIsOpen(false); // Close mobile menu if open

    Swal.fire({
      title: "Are you sure?",
      text: "You will need to sign back in to access your dashboard settings.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48", // Rose Red
      cancelButtonColor: "#6b7280",  // Gray
      confirmButtonText: "Yes, Log out",
      cancelButtonText: "Stay logged in",
      customClass: {
        popup: "rounded-3xl p-5 shadow-xl border border-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirect to your logout route or clear token directly
        navigate("/logout");
      }
    });
  };

  // SweetAlert2 Admin External Navigation Warning
  const handleAdminRedirect = (e, url) => {
    e.preventDefault();
    setIsOpen(false);

    Swal.fire({
      title: "Switching Environment",
      text: "You are navigating directly to the live Production Management dashboard system.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5", // Indigo
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Proceed to Admin",
      customClass: {
        popup: "rounded-3xl p-5 shadow-xl border border-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = url;
      }
    });
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand/Logo Wrapper Section */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Dastoor Logo" className="rounded-full max-w-[50px] border border-gray-100 dark:border-gray-800" />
            <div className="flex-shrink-0 text-xl md:text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
              Dastoor Shawls Maker
            </div>
          </div>

          {/* Desktop Menu Layout Options */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={linkClasses}>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClasses}>
              About Us
            </NavLink>
            <NavLink to="/collection" className={linkClasses}>
              Collection
            </NavLink>
            <NavLink to="/stone" className={linkClasses}>
              Stone
            </NavLink>

            {/* Dark Mode Icon Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-lg text-gray-600 dark:text-gray-300 hover:text-indigo-500 cursor-pointer p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
              aria-label="Toggle Theme Mode Setting"
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>

            {/* Micro Interaction Authorization State Check */}
            {loggedIn ? (
              <a
                href="/logout"
                onClick={handleLogoutClick}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition shadow-sm text-sm"
              >
                Logout
              </a>
            ) : (
              <div
                className="relative"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                {/* Main Auth Toggle Button */}
                <button
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition shadow-sm text-sm"
                >
                  Login
                </button>

                {/* Dropdown Options Interface Context Menu */}
                <div
                  className={`absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden transform transition-all duration-200 z-50 ${
                    hovered
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                  }`}
                >
                  <NavLink
                    to="/login"
                    className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/60 font-medium border-b border-gray-50 dark:border-gray-700/30"
                  >
                    User Portal Sign-In
                  </NavLink>
                  <NavLink
                    to="/admin-login"
                    className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/60 font-medium"
                  >
                    Admin Core Center
                  </NavLink>
                </div>
              </div>
            )}
            
            <a
              href="https://dastoor-shawls-maker.vercel.app/admin"
              onClick={(e) => handleAdminRedirect(e, "https://dastoor-shawls-maker.vercel.app/admin")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition"
            >
              <FaToggleOn size={14} /> <span>Switch To Admin</span>
            </a>
          </div>

          {/* Responsive Mobile Menu Controller Activator Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 text-2xl cursor-pointer p-1.5 rounded-lg bg-gray-50 dark:bg-gray-800"
              aria-label="Toggle Navigation Side Menu"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Dropdown Implementation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-6 py-5 space-y-4 flex flex-col transition-all duration-200">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={linkClasses}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)} className={linkClasses}>
            About Us
          </NavLink>
          <NavLink to="/collection" onClick={() => setIsOpen(false)} className={linkClasses}>
            Collection
          </NavLink>
          <NavLink to="/stone" onClick={() => setIsOpen(false)} className={linkClasses}>
            Stone
          </NavLink>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Theme Shift Utility Row */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Layout Appearance</span>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-lg text-gray-700 dark:text-gray-200 cursor-pointer p-2 rounded-xl bg-gray-50 dark:bg-gray-800"
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>
          </div>

          {/* Conditional Responsive Auth Triggers */}
          {loggedIn ? (
            <a
              href="/logout"
              onClick={handleLogoutClick}
              className="block text-center px-4 py-2.5 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition text-sm shadow-sm"
            >
              Logout Account
            </a>
          ) : (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center px-3 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold text-xs"
              >
                User Login
              </NavLink>
              <NavLink
                to="/admin-login"
                onClick={() => setIsOpen(false)}
                className="block text-center px-3 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-600/10"
              >
                Admin Login
              </NavLink>
            </div>
          )}

          <a
            href="https://dastoor-shawls-maker.vercel.app/admin"
            onClick={(e) => handleAdminRedirect(e, "https://dastoor-shawls-maker.vercel.app/admin")}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/40 hover:bg-amber-100 transition"
          >
            <FaToggleOn size={14} /> <span>Open Production Admin Panel</span>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;