import React from "react";
import Layout from "../components/Layout/Layout";
import UserMenu from "./UserMenu";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Urbanix App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              {/* Accessing the user name */}
              <h3>Welcome, {auth?.user?.name || "User"}!</h3>
            </div>
            {/* Content from nested routes will be rendered here */}
            <Outlet />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
