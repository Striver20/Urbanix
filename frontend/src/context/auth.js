import { useState, createContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
  });

  useEffect(() => {
    const data = localStorage.getItem("userInfo");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        user: parsedData.user,
        token: parsedData.token,
      });
    } else console.log("No User info in Local Storage");
  }, []); // Run only once after the initial render

  const setInfo = (info) => {
    if (info) {
      setAuth({
        user: info.user,
        token: info.token,
      });
      localStorage.setItem("userInfo", JSON.stringify(info));
    } else {
      setAuth({
        user: null,
        token: null,
      });
      localStorage.removeItem("userInfo");
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
