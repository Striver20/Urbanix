import { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Layout/Spinner";
import { API_BASE_URL } from "../config/api";

const PrivateRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        console.log("Auth from private: ", auth.token);
        const res = await axios.get(
          `${API_BASE_URL}/api/v1/auth/user-auth`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        if (res.data.ok) {
          setOk(true);
        } else {
          <Spinner />;
          setOk(false);
        }
      } catch (err) {
        <Spinner />;
        setOk(false);
      }
    };
    authCheck();
  }, [auth.token, navigate]);

  if (!ok) {
    return <Spinner />;
  }
  return children;
};

export default PrivateRoute;
