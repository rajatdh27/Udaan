import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes(props) {
  return props.auth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
