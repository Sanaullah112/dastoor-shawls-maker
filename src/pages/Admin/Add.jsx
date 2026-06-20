import { useState } from "react";
import Img from "../../assets/products/upload.jpeg";
import axios from "axios";
import { backendURL } from "../../App";
import { toast } from "react-toastify";

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
    bestSeller: false, // ✅ fixed field name
    size: "",
  });

  // handle input + checkbox
  const handleChangeItems = (e) => {
    const { name, value, type, checked } = e.target;
    setItems((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handle image select
  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (file) {
      setImages((prev) => ({ ...prev, [name]: file }));
      setPreviews((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  // handle form submit
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // ✅ consistent naming with backend
      formData.append("name", items.name);
      formData.append("description", items.description);
      formData.append("category", items.category);
      formData.append("subCategory", items.subCategory);
      formData.append("bestSeller", items.bestSeller); 
      formData.append("sizes", items.size);
      // const sizesArray = items.size.split(",").map(size => size.trim());
      // formData.append("sizes", JSON.stringify(sizesArray));


      // append images
      if (images.image1) formData.append("image1", images.image1);
      if (images.image2) formData.append("image2", images.image2);
      if (images.image3) formData.append("image3", images.image3);

      const res = await axios.post(`${backendURL}api/product/add`, formData, {
        headers: {
          Authorization: localStorage.getItem("adminToken"),
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message || "Product added successfully!");
      console.log("Upload successful:", res.data);

      // reset form
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
      toast.error(
        error.response?.data?.message || "Upload failed. Check console for details."
      );
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col w-full items-start gap-3 justify-center"
      encType="multipart/form-data"
    >
      {/* Image upload */}
      <div>
        <p className="mb-2">Upload Images</p>
      </div>

      <div className="flex gap-2">
        {["image1", "image2", "image3"].map((imgKey) => (
          <label key={imgKey} htmlFor={imgKey}>
            <img
              src={previews[imgKey]}
              alt="Preview"
              className="w-20 h-20 object-cover border rounded"
            />
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

      {/* Product name */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={handleChangeItems}
          value={items.name}
          name="name"
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-[500px] px-3 py-2 border rounded"
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={handleChangeItems}
          value={items.description}
          name="description"
          placeholder="Write content here"
          required
          className="w-full max-w-[500px] px-3 py-2 border rounded"
        />
      </div>

      {/* Category + SubCategory */}
      <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={handleChangeItems}
            value={items.category}
            name="category"
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Stone">Stone</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select
            onChange={handleChangeItems}
            value={items.subCategory}
            name="subCategory"
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Summer">Summer</option>
            <option value="Winter">Winter</option>
            <option value="Both">Both</option>
            <option value="Stone">Stone</option>
          </select>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2">Sizes</p>
        <input
          onChange={handleChangeItems}
          value={items.size}
          name="size"
          type="text"
          placeholder="e.g., S, M, L or 36*38"
          className="w-full max-w-[500px] px-3 py-2 border rounded"
        />
      </div>

      {/* Bestseller */}
      <div className="flex gap-2 mt-2">
        <input
          onChange={handleChangeItems}
          checked={items.bestSeller}
          name="bestSeller"
          type="checkbox"
          id="bestSeller"
        />
        <label className="cursor-pointer" htmlFor="bestSeller">
          Add to Bestseller
        </label>
      </div>

      {/* Submit */}
      <button
        className="w-28 py-3 mt-2 bg-black text-white rounded hover:bg-gray-800"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
