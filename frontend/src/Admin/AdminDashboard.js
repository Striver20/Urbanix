import React from "react";
import Layout from "../components/Layout/Layout";
import AdminMenu from "./AdminMenu";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">Content</div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
