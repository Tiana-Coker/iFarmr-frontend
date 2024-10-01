import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextProps {
  token: string | null;
  baseUrl: string;
  setToken: (token: string | null, username?: string | null, role?: string | null) => void; // Add role as optional
  isAuthenticated: boolean;
  adminName: string | null;
  userRole: string | null; // Add userRole here
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token); // Initialize auth status based on token
  const [adminName, setAdminName] = useState<string | null>(() => {
    return localStorage.getItem('username') || null;  // Store adminName in context
  });
  const [userRole, setUserRole] = useState<string | null>(() => {
    return localStorage.getItem('userRole') || null; // Initialize user role
  });

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Save or clear token in localStorage
  const saveToken = (userToken: string | null, username: string | null = null, role: string | null = null) => {
    if (userToken) {
      localStorage.setItem('token', userToken);
      if (username) {
        localStorage.setItem('username', username); // Store the username when available
        setAdminName(username); // Update adminName
      }
      if (role) {
        localStorage.setItem('userRole', role); // Store the user role
        setUserRole(role); // Update userRole
      }
      setIsAuthenticated(true); // User is authenticated
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userRole'); // Clear user role on logout
      setAdminName(null);
      setUserRole(null); // Clear userRole on logout
      setIsAuthenticated(false); // User is no longer authenticated
    }
    setToken(userToken);
  };

  // Check token expiration on load or token change
  useEffect(() => {
    const expiration = localStorage.getItem('tokenExpiration');
    if (expiration && Date.now() > parseInt(expiration)) {
      console.log('Token has expired.');
      saveToken(null); // Clear token if it's expired
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, baseUrl, setToken: saveToken, isAuthenticated, adminName, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};
