import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShopContext } from "../../Context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";
import { backendURL } from "../../App"; // Make sure you export backendURL from App.jsx

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
            <div className="flex justify-center items-center h-96">
                <p className="text-gray-500 text-lg">
                    Product not found. Please go back to the collection.
                </p>
                <button
                    onClick={() => navigate("/collection")}
                    className="ml-3 px-4 py-2 bg-indigo-600 text-white rounded-md"
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
        const phoneNumber = "923329886187"; // your WhatsApp number
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

            toast.success("Your Order Is Place SuccessFylly.")

            // ✅ WhatsApp Message
           const message = `
                    🧣 *New Shawl Order*

                    🛍️ *Product Details*
                    • *Name:* ${product.name}
                    • *Category:* ${product.category}
                    • *Subcategory:* ${product.subCategory}
                    • Sizes: ${ Array.isArray(product.sizes)
                                ? product.sizes.join(", ")
                                : product.sizes || "N/A"}
                    📸 *Image:* [View Image](${backendURL.replace(/\/$/, "")}${imageURL})

                    👤 *Customer Info*
                    • *Full Name:* ${orderData.fullName}
                    • *Address:* ${orderData.address}
                    • *Phone:* ${orderData.phone}
                    • *Date:* ${orderData.date || "N/A"}
                    • *Time:* ${orderData.time || "N/A"}
                    `;

            // ✅ Open WhatsApp chat with prefilled message
            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");

            // ✅ Send order data to backend
            const res = await axios.post(`${backendURL}api/orders/add`, newOrder);
            console.log("✅ Order saved successfully:", res.data);

            // ✅ Reset form and close modal
            setOrderData({
                fullName: "",
                address: "",
                phone: "",
                date: "",
                time: "",
            });
            setShowForm(false);


        } catch (error) {
            console.error("❌ Error saving order:", error);
            toast.error("Something went wrong while placing your order. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-5xl mx-auto px-6 lg:px-12">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-gray-700 dark:text-gray-200 hover:underline"
                >
                    ← Back to Collection
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Image Section */}
                    <div>
                        <img
                            src={
                                selectedImage
                                    ? `${backendURL.replace(/\/$/, "")}${selectedImage}`
                                    : "/noimage.jpg"
                            }
                            alt={product.name}
                            className="w-full h-96 object-cover rounded-lg shadow-md mb-4"
                        />
                        <div className="flex gap-3">
                            {product.image?.slice(0, 3).map((img, index) => (
                                <img
                                    key={index}
                                    src={`${backendURL.replace(/\/$/, "")}${img.startsWith("/") ? img : `/${img}`}`}
                                    alt={`angle-${index}`}
                                    onClick={() => setSelectedImage(img)}
                                    className={`w-24 h-24 object-cover rounded-md cursor-pointer border ${
                                        selectedImage === img ? "border-indigo-600" : "border-gray-300"
                                    }`}
                                    />

                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                            {product.name}
                        </h1>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            {product.description}
                        </p>

                        <div className="space-y-2 mb-6 dark:text-gray-200">
                            <p>
                                <span className="font-semibold">Category:</span>{" "}
                                {product.category}
                            </p>
                            <p>
                                <span className="font-semibold">Subcategory:</span>{" "}
                                {product.subCategory}
                            </p>
                            <p>
                                <span className="font-semibold">Available Sizes:</span>{" "}
                                {product.sizes}
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="px-5 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => setShowForm(true)}
                                className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Order Now
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Order Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-300 p-6 rounded-xl shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Complete Your Order
                        </h2>
                        <div className="space-y-3">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={orderData.fullName}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={orderData.address}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                                value={orderData.phone}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                            <input
                                type="date"
                                name="date"
                                value={orderData.date}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                            <input
                                type="time"
                                name="time"
                                value={orderData.time}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-5">
                            <button
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleOrder}
                                disabled={loading}
                                className={`px-4 py-2 text-white rounded-md ${loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700"
                                    }`}
                            >
                                {loading ? "Sending..." : "Send Order"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductDetail;
