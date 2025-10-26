import React from "react";
import Layout from "../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <AdminMenu />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Content from nested routes will be rendered here */}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
