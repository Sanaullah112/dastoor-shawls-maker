import img from "../../assets/products/logo.jpg";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FaPlus,
  FaList,
  FaShoppingCart,
  FaHome,
  FaSignOutAlt,
  FaToggleOff,
  FaGlobe,
  FaCity,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const AdminNavbar = ({ setToken }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Auto-close menu on scroll
  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("scroll", closeMenu);
    return () => window.removeEventListener("scroll", closeMenu);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You’ll be logged out of the admin panel.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminToken");
        setToken("");

        Swal.fire({
          title: "Logged Out",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 1400,
          showConfirmButton: false,
        });

        setTimeout(() => {
          window.location.href = "/admin-login";
        }, 300);
      }
    });
  };

  const navItemClass = (isActive) =>
    `flex items-center gap-2 px-4 py-3 rounded-md transition
     ${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"}`;

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        <img className="max-w-[100px]" src={img} alt="Admin Logo" />

        {/* Mobile menu button */}
        <button
          className="sm:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex gap-4">
          <NavLink to="/admin" className={({ isActive }) => navItemClass(isActive)}>
            <FaHome /> Dashboard
          </NavLink>

          <NavLink to="/admin/add" className={({ isActive }) => navItemClass(isActive)}>
            <FaPlus /> Add
          </NavLink>

          <NavLink to="/admin/country" className={({ isActive }) => navItemClass(isActive)}>
            <FaGlobe /> Countries
          </NavLink>

          <NavLink to="/admin/addcity" className={({ isActive }) => navItemClass(isActive)}>
            <FaCity /> Cities
          </NavLink>

          <NavLink to="/admin/list" className={({ isActive }) => navItemClass(isActive)}>
            <FaList /> List
          </NavLink>

          <NavLink to="/admin/order" className={({ isActive }) => navItemClass(isActive)}>
            <FaShoppingCart /> Orders
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-3 rounded-md text-gray-700 hover:bg-red-100 hover:text-red-600 transition"
          >
            <FaSignOutAlt /> Logout
          </button>

          <NavLink
            to="/"
            className="flex items-center gap-2 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <FaToggleOff /> Switch
          </NavLink>
        </nav>
      </div>

      {/* Mobile Menu */}
{menuOpen && (
  <div
    onClick={() => setMenuOpen(false)}
    className="sm:hidden fixed inset-0 bg-black bg-opacity-40 backdrop-blur-xs z-40"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute top-0 right-0 h-full w-[70%] bg-white border-l border-gray-300 shadow-xl 
      px-6 py-4 space-y-3 slide-right"
    >

      <NavLink
        to="/admin"
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) => navItemClass(isActive)}
      >
        <FaHome /> Dashboard
      </NavLink>

      <NavLink
        to="/admin/add"
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) => navItemClass(isActive)}
      >
        <FaPlus /> Add
      </NavLink>

      <NavLink
        to="/admin/country"
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) => navItemClass(isActive)}
      >
        <FaGlobe /> Countries
      </NavLink>

      <NavLink
        to="/admin/addcity"
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) => navItemClass(isActive)}
      >
        <FaCity /> Cities
      </NavLink>

      <NavLink
        to="/admin/list"
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) => navItemClass(isActive)}
      >
        <FaList /> List
      </NavLink>

      <NavLink
        to="/admin/order"
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) => navItemClass(isActive)}
      >
        <FaShoppingCart /> Orders
      </NavLink>

      <button
        onClick={() => {
          setMenuOpen(false);
          handleLogout();
        }}
        className="flex items-center gap-2 px-4 py-3 rounded-md text-gray-700 hover:bg-red-100 hover:text-red-600 transition"
      >
        <FaSignOutAlt /> Logout
      </button>

      <NavLink
        to="/"
        onClick={() => setMenuOpen(false)}
        className="flex items-center gap-2 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100"
      >
        <FaToggleOff /> Switch
      </NavLink>

    </div>
  </div>
)}

    </header>
  );
};

export default AdminNavbar;
