import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center my-10">
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg p-5">
        <h1 className="text-2xl font-bold mb-5 text-blue-600">Admin Panel</h1>
        <div className="flex flex-col space-y-3">
          <NavLink
            to="/dashboard/admin/create-category"
            className="bg-gray-200 hover:bg-blue-600 hover:text-white border border-gray-300 rounded-md py-2 px-4 text-lg text-gray-700 transition duration-200"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="bg-gray-200 hover:bg-blue-600 hover:text-white border border-gray-300 rounded-md py-2 px-4 text-lg text-gray-700 transition duration-200"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="bg-gray-200 hover:bg-blue-600 hover:text-white border border-gray-300 rounded-md py-2 px-4 text-lg text-gray-700 transition duration-200"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="bg-gray-200 hover:bg-blue-600 hover:text-white border border-gray-300 rounded-md py-2 px-4 text-lg text-gray-700 transition duration-200"
          >
            Users
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
