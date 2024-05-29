import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Layout/Spinner";

const AdminRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/auth/admin-auth",
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

export default AdminRoute;
