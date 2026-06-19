// User Imports
import { useState } from "react";
import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Stoon from "./pages/Stone/Stoon";
import NotFound from "./pages/NotFound";
import Logout from "./pages/Logout";
import { Toaster } from "react-hot-toast";
import TopMessage from "./Components/TopMessage";
import Contact from "./Components/Footer/Contact";
import About from "./Components/Footer/About";
import Blogs from "./Components/Blogs/Blogs";
import BlogsS from "./Components/Blogs/BlogsS";
import BlogDetails from "./Components/Blogs/BlogsDeatils";
import FAQs from "./Components/Footer/FAQs";
import Privacy_Policy from "./Components/Footer/Privecy_policy";
import Team from "./Components/Footer/Team";
import Collection from "./pages/Collection/Collection";
import ProductDetail from "./pages/Collection/ProductDetail";

// Admin imports
import Add from "./pages/Admin/Add";
import List from "./pages/Admin/List";
import Orders from "./pages/Admin/Order";
import AdminLogin from "./Components/Admin/AdminLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "sweetalert2/dist/sweetalert2.min.css";
import AdminHome from "./pages/Admin/AdminHome";
import { AddCountry } from "./pages/Admin/AddCountry";
import AdminNavbar from "./Components/Admin/AdminNavbar";
import { AddCity } from "./pages/Admin/AddCity";

// Our Frontend and Backend joain Url
export const backendURL = import.meta.env.VITE_BACKEND_URL;


// ---------- FRONTEND ----------
const FrontendRoutes = () => {
  const location = useLocation();
  const showNav = [
    "/", "/stone", "/login", "/contact", "/about", "/register", "/faqs",
    "/privacy", "/team", "/collection"
  ];
  const shouldShowNav = showNav.some(path => location.pathname.startsWith(path));

  return (
    <>
      {shouldShowNav && <Navbar />}
      {shouldShowNav && <TopMessage />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/pdetail/:id" element={<ProductDetail />} />
        <Route path="/stone" element={<Stoon />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blogs" element={<BlogsS />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/privacy" element={<Privacy_Policy />} />
        <Route path="/team" element={<Team />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {shouldShowNav && <Footer />}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

// ---------- ADMIN ----------
const AdminRoutes = () => {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");

// ...

  if (!token) {
    return (
      <div className="bg-gray-50 min-h-screen flex justify-center items-center">
        <ToastContainer position="top-right" autoClose={3000} />
        <AdminLogin setToken={setToken} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* 🔹 Admin Top Navbar */}
       <AdminNavbar setToken={setToken} />

      {/* 🔹 Main Page Content */}
      <main className="flex-1 p-6">
        <Routes>
          <Route index element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/add" element={<Add />} />
          <Route path="/admin/country" element={<AddCountry />} />
          <Route path="/admin/addcity" element={<AddCity />} />
          <Route path="/admin/list" element={<List />} />
          <Route path="/admin/order" element={<Orders />} />
        </Routes>
      </main>
    </div>
  );
};

// ---------- MAIN APP ----------
// ---------- MAIN APP ----------
const App = () => {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/admin-login";

  return (
    <div>
      {isAdminRoute ? <AdminRoutes /> : <FrontendRoutes />}
    </div>
  );
};



export default App;
