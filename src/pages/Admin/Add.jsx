import { useState } from "react";
import Img from "../../assets/products/upload.jpeg";
import axios from "axios";
import { backendURL } from "../../App";
import Swal from "sweetalert2";
import { FaCloudUploadAlt } from "react-icons/fa";

const Add = () => {
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  const [previews, setPreviews] = useState({
    image1: Img,
    image2: Img,
    image3: Img,
  });

  const [items, setItems] = useState({
    name: "",
    description: "",
    category: "Men",
    subCategory: "Summer",
    bestSeller: false,
    size: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input + checkbox
  const handleChangeItems = (e) => {
    const { name, value, type, checked } = e.target;
    setItems((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle image select
  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (file) {
      setImages((prev) => ({ ...prev, [name]: file }));
      setPreviews((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  // Handle form submit
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: "Uploading Product...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const formData = new FormData();
      formData.append("name", items.name);
      formData.append("description", items.description);
      formData.append("category", items.category);
      formData.append("subCategory", items.subCategory);
      formData.append("bestSeller", items.bestSeller);
      formData.append("sizes", items.size);

      if (images.image1) formData.append("image1", images.image1);
      if (images.image2) formData.append("image2", images.image2);
      if (images.image3) formData.append("image3", images.image3);

      const res = await axios.post(`${backendURL}api/product/add`, formData, {
        headers: {
          Authorization: localStorage.getItem("adminToken"),
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Product Added!",
        text: res.data.message || "Product added successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      setItems({
        name: "",
        description: "",
        category: "Men",
        subCategory: "Summer",
        bestSeller: false,
        size: "",
      });
      setImages({ image1: null, image2: null, image3: null });
      setPreviews({ image1: Img, image2: Img, image3: Img });
    } catch (error) {
      console.error("Upload failed:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.response?.data?.message || "Upload failed. Check console for details.",
        confirmButtonColor: "#4f46e5",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Add New Product</h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-6">Create a new entry in your store inventory.</p>

        <form onSubmit={onSubmit} className="space-y-5" encType="multipart/form-data">
          
          {/* Responsive Image Upload Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Images</label>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {["image1", "image2", "image3"].map((imgKey) => (
                <label 
                  key={imgKey} 
                  htmlFor={imgKey} 
                  className="group relative cursor-pointer block border-2 border-dashed border-gray-200 hover:border-indigo-500 rounded-xl transition duration-150 p-1 bg-gray-50"
                >
                  <img
                    src={previews[imgKey]}
                    alt="Preview"
                    className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center transition duration-150">
                    <FaCloudUploadAlt className="text-white" size={22} />
                  </div>
                  <input
                    type="file"
                    name={imgKey}
                    id={imgKey}
                    hidden
                    accept="image/*"
                    onChange={handleChangeImg}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Product Name</label>
            <input
              onChange={handleChangeItems}
              value={items.name}
              name="name"
              type="text"
              placeholder="e.g., Slim Fit Cotton Shirt"
              required
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition placeholder-gray-400 text-sm"
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Product Description</label>
            <textarea
              onChange={handleChangeItems}
              value={items.description}
              name="description"
              placeholder="Provide a detailed overview of the product specifications..."
              required
              rows={4}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition placeholder-gray-400 text-sm"
            />
          </div>

          {/* Categories Row - Adapts from grid-cols-1 on mobile to 2 columns on tablets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Product Category</label>
              <select
                onChange={handleChangeItems}
                value={items.category}
                name="category"
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-gray-700 cursor-pointer"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
                <option value="Stone">Stone</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sub Category</label>
              <select
                onChange={handleChangeItems}
                value={items.subCategory}
                name="subCategory"
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-gray-700 cursor-pointer"
              >
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
                <option value="Both">Both</option>
                <option value="Stone">Stone</option>
              </select>
            </div>
          </div>

          {/* Sizes input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Available Sizes</label>
            <input
              onChange={handleChangeItems}
              value={items.size}
              name="size"
              type="text"
              placeholder="e.g., S, M, L or 36, 38, 40"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition placeholder-gray-400 text-sm"
            />
          </div>

          {/* Bestseller Checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              onChange={handleChangeItems}
              checked={items.bestSeller}
              name="bestSeller"
              type="checkbox"
              id="bestSeller"
              className="mt-0.5 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
            />
            <label className="text-sm font-medium text-gray-700 cursor-pointer select-none leading-tight" htmlFor="bestSeller">
              Mark this product as a Bestseller
            </label>
          </div>

          {/* Form Action Button - Full width on mobile, auto width on screens higher than mobile */}
          <div className="pt-2">
            <button
              disabled={isSubmitting}
              className="w-full sm:w-36 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;