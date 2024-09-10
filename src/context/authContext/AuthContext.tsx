import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface AuthContextProps {
  token: string | null;
  baseUrl: string;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token'); // Retrieve token from localStorage
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Track auth status

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Save token to localStorage and validate it
  const saveToken = (userToken: string | null) => {
    if (userToken) {
      localStorage.setItem('token', userToken);
    } else {
      localStorage.removeItem('token');
    }
    setToken(userToken);
  };

  // Validate the token when it's set or on initial load
  const validateToken = async (token: string | null) => {
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      await axios.get(`${baseUrl}/api/v1/auth/validate-token`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsAuthenticated(true); // Set authenticated state if token is valid
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error('Token validation error:', axiosError.response?.data || axiosError);
      setIsAuthenticated(false); // If validation fails, set to false
      saveToken(null); // Clear invalid token
    }
  };

  useEffect(() => {
    validateToken(token); // Validate token on load or token change
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, baseUrl, setToken: saveToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
