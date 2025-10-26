import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Layout/Spinner";
import { API_BASE_URL } from "../config/api";

const AdminRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        if (!auth?.token) {
          setOk(false);
          return;
        }

        const res = await axios.get(
          `${API_BASE_URL}/api/v1/auth/admin-auth`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (err) {
        console.error("Admin auth check error:", err);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setOk(false);
    }
  }, [auth?.token, navigate]);

  if (!ok) {
    return <Spinner />;
  }
  return children;
};

export default AdminRoute;
