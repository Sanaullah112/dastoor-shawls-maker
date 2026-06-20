import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "../App";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // ✅ Fetch all products
  // ==========================================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${backendURL}api/product/list`);
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        console.error("Unexpected response:", res.data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refreshProducts = () => {
    fetchProducts();
  };

  return (
    <ShopContext.Provider value={{ products, loading, refreshProducts }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
