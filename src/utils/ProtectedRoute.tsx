import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth(); // Get authentication status

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
