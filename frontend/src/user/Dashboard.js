import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import UserMenu from "./UserMenu";
import { Outlet } from "react-router-dom";
import AuthContext from "../context/auth";
const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  console.log(auth);
  return (
    <Layout title={"Dashboard- Urbanix App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              {/* Since auth contains only user name so only that can be assessed with it. To get email and password too get access to localstorage*/}
              <h3> {auth?.user}</h3>
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
