import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // Set default axios header for authorization
  axios.defaults.headers.common["Authorization"] = auth?.token || "";

  useEffect(() => {
    // Load auth data from localStorage
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        user: parsedData.user,
        token: parsedData.token,
      });
      localStorage.setItem("auth", JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever auth state changes
    if (auth?.token) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing AuthContext
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
