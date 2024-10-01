import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext/AuthContext';
import { useNotification } from '../../context/notificationContext/Notification';
import axios from 'axios';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { setToken, firebaseToken, setFirebaseToken, baseUrl } = useAuth();
  const { showNotification } = useNotification();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Call your API to delete the Firebase token
        await axios.delete(`${baseUrl}/token/firebase-delete`, {
          data: { token: firebaseToken }, // Send the token in the request body
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Use the existing token for authorization
          },
        });

        // Clear Firebase token from context and local storage
        setFirebaseToken(null);
        localStorage.removeItem('firebaseToken'); 
        setToken(null); // Clear the rest of the tokens
        showNotification('You have been logged out successfully!');
        navigate('/login');
      } catch (error) {
        console.error('Error during logout:', error);
        showNotification('Logout failed. Please try again.');
      }
    };

    logoutUser();
  }, [setToken, setFirebaseToken, baseUrl, navigate, showNotification, firebaseToken]); // Add firebaseToken to dependencies

  return null; // Or you can render a loading spinner if you want
};

export default Logout;
