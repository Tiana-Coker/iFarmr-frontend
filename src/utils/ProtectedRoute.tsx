import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: string[]; // Optional prop to specify allowed roles
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, userRole } = useAuth(); // Get authentication status and user role

  // Check if the user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user's role is allowed (if roles are provided)
  if (allowedRoles && !allowedRoles.includes(userRole || '')) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and role is allowed, render the route's children
  return <Outlet />;
};

export default ProtectedRoute;
