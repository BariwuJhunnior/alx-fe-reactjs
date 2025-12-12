import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * A wrapper component that checks for authentication.
 * If authenticated, it renders the child element (the protected page).
 * If NOT authenticated, it redirects the user to the login page.
 * * @param {object} children - The component(s) that the protected route should render.
 */
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  //1. Check Authentication Status
  if (!user) {
    //2. Redirect to Login if NOT Authenticated
    // The 'replace: true' prop ensures the login page replaces the history entry,
    // so the user can't hit the back button to bypass the protection.
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
