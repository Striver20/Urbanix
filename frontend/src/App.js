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
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/" Component={Home} />
        <Route path="/register" Component={Register} />
        <Route path="/forgot-password" Component={ForgotPassword} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route />
      </Routes>
    </Router>
  );
};

export default App;
