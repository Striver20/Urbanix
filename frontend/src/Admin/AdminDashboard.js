import React from "react";
import Layout from "../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            {/* Content from nested routes will be rendered here */}
            <Outlet />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
