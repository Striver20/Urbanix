import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-outside">
          <h1>Admin Panel</h1>
          <div className="flex flex-col m-2">
            <NavLink
              to="/dashboard/user/profile"
              className="border-gray-500 border-2 m-2 rounded p-1"
            >
              Profile
            </NavLink>
            <NavLink
              to="/dashboard/user/orders"
              className="border-gray-500 border-2 m-2 rounded p-1"
            >
              Orders
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
