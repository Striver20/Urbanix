import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
import Home from "./Screens/Home";
import Register from "./Screens/Register";
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./Routes/Private";
import ForgotPassword from "./components/Layout/ForgotPassword";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminRoute from "./Routes/AdminRoute";
import CreateProduct from "./Admin/CreateProduct";
import CreateCategory from "./Admin/CreateCategory";
import Order from "./user/Order";
import Profile from "./user/Profile";
import Products from "./Admin/Products";
import UpdateProduct from "./Admin/UpdateProduct";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* User Dashboard Route */}
        <Route
          path="/dashboard/user"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="orders" element={<Order />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        {/* Admin Dashboard Route */}
        <Route
          path="/dashboard/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="products" element={<Products />} />
          <Route path="update-product/:slug" element={<UpdateProduct />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
