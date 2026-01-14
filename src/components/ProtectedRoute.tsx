import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();

  // Show spinner while checking for existing session
  if (loading) {
    return <Spinner loading={true} />;
  }

  // If not loading and no session, redirect to signin
  return session ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
