import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user,setUser] = useState(null);

  // On first load, check localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Store token and update state
  const storeToken = (TokenVal) => {
    localStorage.setItem("token", TokenVal);
    setToken(TokenVal); // ✅ update state
  };

  // Logout functionality
  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(null); // ✅ clear state
    setUser(null)
  };

  const loggedIn = !!token;

//function for autentication and getting data
const userAuthentication = async() =>{
   try {
      const responseData = await fetch(`http://localhost:5000/api/auth/userData`,{
         method:"GET",
         headers:{
           Authorization: `Bearer${token}`,
         },         
      });

      if(responseData.ok){
            const data = await responseData.json();
            console.log("userData from backend",data.userData);
            setUser(data.userData);   
      }else{
        setUser(null);
      }
   } catch (error) {
      console.error(" Error in Fetch",error);
      setUser(null);
   }
}
 useEffect(() => {
  if (token) {
    userAuthentication();
  }
}, [token]);

  return (
    <AuthContext.Provider value={{ loggedIn, storeToken, removeToken,user}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return authContextValue;
};
