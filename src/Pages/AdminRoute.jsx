import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../Pages/UserRoute";

const AdminRoute = () => {
  const user = AuthService.getCurrentUser();
  return user?.role === "admin" ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default AdminRoute;
