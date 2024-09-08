// AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextProps {
  token: string | null;
  baseUrl: string;
  setToken: (token: string | null) => void;
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
    // Get token from localStorage if it exists
    return localStorage.getItem('token');
  });

  const baseUrl = 'http://localhost:8080'; // Hardcoded for local development

  const saveToken = (userToken: string | null) => {
    if (userToken) {
      localStorage.setItem('token', userToken);
    } else {
      localStorage.removeItem('token');
    }
    setToken(userToken);
  };

  return (
    <AuthContext.Provider value={{ token, baseUrl, setToken: saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};
