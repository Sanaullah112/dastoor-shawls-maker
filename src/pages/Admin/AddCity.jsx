import { useEffect, useState } from "react";
import { backendURL } from "../../App";
import { toast } from "react-toastify";
import axios from "axios";

export const AddCity = () => {
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);

  // Load countries
  useEffect(() => {
    axios
      .get(`${backendURL}api/product`)
      .then((res) => setCountries(res.data))
      .catch(() => toast.error("Failed to load countries")); 
  }, []);

  // Submit city
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName || !countryId) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${backendURL}api/product/cities`,
        { name: cityName, country: countryId },
        {
          headers: {
            Authorization: localStorage.getItem("adminToken"),
          },
        }
      );

      toast.success("City added successfully");

      // Clear input and dropdown
      setCityName("");
      setCountryId("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add city"
      );
    }

    setLoading(false);
  };

  return (
    <div className="w-full flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Add City
        </h2>

        {/* Country Dropdown */}
        <div>
          <label className="block mb-1 text-gray-700">
            Select Country
          </label>

          <select
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* City Input */}
        <div>
          <label className="block mb-1 text-gray-700">City Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter city name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add City"}
        </button>
      </form>
    </div>
  );
};
