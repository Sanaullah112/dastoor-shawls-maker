import { useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "../../App";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const List = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendURL}api/product/list`, {
        headers: { Authorization: localStorage.getItem("adminToken") },
      });
      setProducts(res.data.products || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Remove product
  const handleRemove = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this product?");
    if (!confirmDelete) return;

    try {
      const res = await axios.post(
        `${backendURL}api/product/remov`,
        { id },
        {
          headers: { Authorization: localStorage.getItem("adminToken") },
        }
      );

      if (res.data.success) {
        toast.success("Product removed successfully!");
        setProducts((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error("Failed to remove product.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error removing product.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading products...</p>;
  }

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">All Products</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Sub Category</th>
                <th className="p-3">Size</th>
                <th className="p-3">Best Seller</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-3">
                    <img
                       src={
                          item.image?.[0]
                            ? `${backendURL.replace(/\/$/, "")}${item.image[0]}`
                            : "/noimage.jpg"
                        }
                        alt={item.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                  </td>
                  <td className="p-3 text-gray-700">{item.name}</td>
                  <td className="p-3 text-gray-600">{item.category}</td>
                  <td className="p-3 text-gray-600">{item.subCategory}</td>
                  <td className="p-3 text-gray-600">
                    {Array.isArray(item.sizes)
                      ? item.sizes.join(", ")
                      : item.sizes}
                  </td>
                  <td className="p-3">
                    {item.bestSeller ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default List;
