import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../Components/AuthService";

const UserRoute = () => {
  const user = AuthService.getCurrentUser();
  return user?.role === "ref" ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default UserRoute;
