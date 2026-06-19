import { useState } from "react";
import axios from "axios";
import { backendURL } from "../../App";
import { toast } from "react-toastify";
import { FiGlobe } from "react-icons/fi";

export const AddCountry = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${backendURL}api/product/addcountries`,
        { name, code },
        {
          headers: { Authorization: localStorage.getItem("adminToken") }
        }
      ); 
      toast.success(res.data.message);
      setName("");
      setCode("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg flex flex-col gap-5"
      >
        <div className="flex items-center justify-center gap-2">
          <FiGlobe size={28} className="text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Add Country
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Country Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter country name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Country Code</label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Optional"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
        >
          Add Country
        </button> 
      </form>
    </div>
  );
};
