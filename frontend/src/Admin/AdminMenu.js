import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-outside">
          <h1>Admin Panel</h1>
          <div className="flex flex-col m-2">
            <NavLink
              to="/dashboard/admin/create-category"
              className="border-gray-500 border-2 m-2 rounded p-1"
            >
              Create category
            </NavLink>
            <NavLink
              to="/dashboard/admin/create-product"
              className="border-gray-500 border-2 m-2 rounded p-1"
            >
              Create Product
            </NavLink>
            <NavLink
              to="/dashboard/admin/users"
              className="border-gray-500 border-2 m-2 rounded p-1"
            >
              Users
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
