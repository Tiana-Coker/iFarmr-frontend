// Logout.tsx
import React, { useEffect } from 'react';
import { useAuth } from '../../context/authContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Call the setToken function to log out the user
    setToken(null); // Clear the token and user data

    // Redirect to the home page after logging out
    navigate('/');
  }, [setToken, navigate]);

  return null; // No UI needed, just a redirect
};

export default Logout;
