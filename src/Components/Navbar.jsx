import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../Context/ContextAPI";
import logo from "../assets/products/logo.jpg";
import { FaToggleOn } from "react-icons/fa";

const Navbar = () => {
  const linkClasses = ({ isActive }) =>
    isActive
      ? "text-red-500 dark:text-red-500 hover:text-red-700 font-bold border-b-4 border-b-blue-600"
      : "text-gray-700 dark:text-gray-200 hover:text-indigo-500";

  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const { loggedIn } = useAuth();

  // Dark Mode Logic
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

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex justify-around items-center">
            <img src={logo} alt="Logo" className="rounded-full max-w-[70px]" />
            <div className="flex-shrink-0 text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400 ml-2">
              Dastoor Shawls Maker
            </div>
          </div>

          {/* Desktop Menu */}
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

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-xl text-gray-700 dark:text-gray-200 cursor-pointer"
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>

            {/* Login / Logout */}
            {loggedIn ? (
              <NavLink
                to="/logout"
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </NavLink>
            ) : (
              <div
                className="relative group"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                {/* Main Login Button */}
                <button
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Login
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 ${hovered
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                    }`}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <NavLink
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                  >
                    User Login
                  </NavLink>
                  <NavLink
                    to="/admin-login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
                  >
                    Admin Login
                  </NavLink>
                </div>
              </div>
            )}
            <Link
                to='http://localhost:5173/admin'
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-red-100 hover:text-red-600 transition"
              >
                <FaToggleOn /> <span className="hidden sm:inline">Switch To AdminPanel</span>
              </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 text-2xl cursor-pointer"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 space-y-3 mt-2 flex flex-col max-w-[30%]">
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

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-xl text-gray-700 dark:text-gray-200 cursor-pointer"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>

          {/* Login for Mobile */}
          {loggedIn ? (
            <NavLink
              to="/logout"
              className="block text-center px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Logout
            </NavLink>
          ) : (
            <div className="space-y-2">
              <NavLink
                to="/login"
                className="block text-center px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                User Login
              </NavLink>
              <NavLink
                to="/admin-login"
                className="block text-center px-2 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Admin Login
              </NavLink>
            </div>
          )};
          <Link
            to='http://localhost:5173/admin'
            className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-red-100 hover:text-red-600 transition"
          >
            <FaToggleOn /> <span className="hidden sm:inline">Switch To AdminPanel</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
