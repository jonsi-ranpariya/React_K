import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  let authToken = sessionStorage.getItem("token");

  return <>{authToken ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default Protected;
