import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShopContext } from "../../Context/ShopContext";
import axios from "axios";
import Swal from "sweetalert2";
import { backendURL } from "../../App";
import { FaArrowLeft, FaShoppingBag, FaCalendarAlt, FaClock, FaPhone, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const ProductDetail = () => {
    const { state: productFromState } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { products } = useContext(ShopContext);

    const product = productFromState || products.find((p) => p._id === id);

    const [showForm, setShowForm] = useState(false);
    const [orderData, setOrderData] = useState({
        fullName: "",
        address: "",
        phone: "",
        date: "",
        time: "",
    });
    const [selectedImage, setSelectedImage] = useState(product?.image?.[0] || "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (product?.image?.[0]) {
            setSelectedImage(product.image[0]);
        }
    }, [product]);

    if (!product) {
        return (
            <div className="flex flex-col justify-center items-center h-96 bg-gray-50 dark:bg-gray-900 px-4">
                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium text-center">
                    Product not found. Please return to the collection window.
                </p>
                <button
                    onClick={() => navigate("/collection")}
                    className="mt-4 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-600/10 hover:bg-indigo-700 transition"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderData((prev) => ({ ...prev, [name]: value }));
    };

    const handleOrder = async () => {
        // Simple Form Validation Checklist
        if (!orderData.fullName.trim() || !orderData.address.trim() || !orderData.phone.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please fill out your Name, Address, and Phone Number to continue.",
                confirmButtonColor: "#4f46e5",
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
                color: document.documentElement.classList.contains("dark") ? "#fff" : "#000"
            });
            return;
        }

        const phoneNumber = "923329886187"; 
        const imageURL = selectedImage || product.image?.[0];

        const newOrder = {
            productId: product._id,
            productName: product.name,
            productCategory: product.category,
            productSubCategory: product.subCategory,
            selectedImage: imageURL,
            customer: orderData,
        };

        try {
            setLoading(true);

            // 1. Send transaction data to database background pipeline
            const res = await axios.post(`${backendURL}api/orders/add`, newOrder);
            console.log("✅ Order saved successfully:", res.data);

            // 2. Format localized elegant WhatsApp textual markup 
            const message = `🧣 *New Shawl Order*\n\n🛍️ *Product Details*\n• *Name:* ${product.name}\n• *Category:* ${product.category}\n• *Subcategory:* ${product.subCategory}\n• *Sizes:* ${Array.isArray(product.sizes) ? product.sizes.join(", ") : product.sizes || "N/A"}\n📸 *Image Link:* ${backendURL.replace(/\/$/, "")}${imageURL}\n\n👤 *Customer Info*\n• *Full Name:* ${orderData.fullName}\n• *Address:* ${orderData.address}\n• *Phone:* ${orderData.phone}\n• *Delivery Date:* ${orderData.date || "N/A"}\n• *Preferred Time:* ${orderData.time || "N/A"}`;

            // 3. Clear localized modal interface
            setShowForm(false);
            setOrderData({ fullName: "", address: "", phone: "", date: "", time: "" });

            // 4. Fire SweetAlert Success Modal before breaking focus via WhatsApp Redirect
            Swal.fire({
                icon: "success",
                title: "Order Placed Locally!",
                text: "We are now moving you over to WhatsApp to secure your delivery confirmation details.",
                confirmButtonText: "Proceed to WhatsApp Chat",
                confirmButtonColor: "#10b981",
                allowOutsideClick: false,
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
                color: document.documentElement.classList.contains("dark") ? "#fff" : "#000"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
                }
            });

        } catch (error) {
            console.error("❌ Error saving order:", error);
            Swal.fire({
                icon: "error",
                title: "Submission Error",
                text: "Something went wrong while logging your item request. Please verify connection metrics and retry.",
                confirmButtonColor: "#ef4444"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Clean Back Navigation Action */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 mb-6 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 group transition"
                >
                    <FaArrowLeft className="transform group-hover:-translate-x-1 transition-transform" size={12} />
                    <span>Back to Collection Inventory</span>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700/50 shadow-sm">
                    
                    {/* Visual Segment Displays */}
                    <div className="space-y-4">
                        <div className="w-full h-[420px] bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                            <img
                                src={
                                    selectedImage
                                        ? `${backendURL.replace(/\/$/, "")}${selectedImage}`
                                        : "/noimage.jpg"
                                }
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        {/* Alternative Thumbnail Selection Strip */}
                        <div className="flex gap-3 overflow-x-auto pb-1">
                            {product.image?.slice(0, 4).map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(img)}
                                    className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 border-2 transition ${
                                        selectedImage === img ? "border-indigo-600 shadow-sm" : "border-transparent opacity-70 hover:opacity-100"
                                    }`}
                                >
                                    <img 
                                        src={`${backendURL.replace(/\/$/, "")}${img.startsWith("/") ? img : `/${img}`}`} 
                                        alt={`view-${index}`} 
                                        className="w-full h-full object-cover" 
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Metadata Presentation Segment */}
                    <motion.div 
                        className="flex flex-col justify-between"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
                                {product.category}
                            </span>
                            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-3 tracking-tight">
                                {product.name}
                            </h1>
                            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mt-1">
                                Sub-line variant: <span className="text-gray-600 dark:text-gray-300">{product.subCategory}</span>
                            </p>
                            
                            <hr className="my-5 border-gray-100 dark:border-gray-700" />
                            
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Description</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                                {product.description || "Premium processed artisan details with standard structural fit alignments designed for functional lifespan durability."}
                            </p>

                            {/* Fit Config Layouts */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-100 dark:border-gray-800 space-y-2 mb-8">
                                <p className="text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
                                    <span className="font-semibold">Available Sizing Matrix:</span>
                                    <span className="font-bold text-gray-900 dark:text-white bg-white dark:bg-gray-800 px-2 py-0.5 rounded border dark:border-gray-700 text-[11px]">
                                        {Array.isArray(product.sizes) ? product.sizes.join(", ") : product.sizes || "Standard"}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Interactive Checkout Controls */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <button
                                onClick={() => navigate(-1)}
                                className="px-5 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                            >
                                Return
                            </button>
                            <button
                                onClick={() => setShowForm(true)}
                                className="flex-grow inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-indigo-600/10 transition"
                            >
                                <FaShoppingBag size={14} />
                                <span>Order Now Via WhatsApp</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Structured Order Form Portal Backdrop */}
            {showForm && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div 
                        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-1">
                            Complete Your Order
                        </h2>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mb-5 font-medium">
                            Please provide delivery attributes to route item logs smoothly.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FaUser size={12} /></span>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={orderData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                                />
                            </div>
                            
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FaMapMarkerAlt size={12} /></span>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Complete Shipping Address"
                                    value={orderData.address}
                                    onChange={handleInputChange}
                                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                                />
                            </div>

                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FaPhone size={12} /></span>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Contact Number (e.g. +92...)"
                                    value={orderData.phone}
                                    onChange={handleInputChange}
                                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FaCalendarAlt size={12} /></span>
                                    <input
                                        type="date"
                                        name="date"
                                        value={orderData.date}
                                        onChange={handleInputChange}
                                        className="w-full pl-9 pr-3 py-2.5 text-xs border border-gray-200 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                                    />
                                </div>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><FaClock size={12} /></span>
                                    <input
                                        type="time"
                                        name="time"
                                        value={orderData.time}
                                        onChange={handleInputChange}
                                        className="w-full pl-9 pr-3 py-2.5 text-xs border border-gray-200 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <button
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-xl transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleOrder}
                                disabled={loading}
                                className={`px-5 py-2.5 text-white text-xs font-bold rounded-xl transition ${
                                    loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/10"
                                }`}
                            >
                                {loading ? "Processing..." : "Send Order Request"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </section>
    );
};

export default ProductDetail;