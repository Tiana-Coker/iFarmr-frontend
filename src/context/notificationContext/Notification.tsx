// NotificationContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface NotificationContextProps {
  showNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Hide notification after 3 seconds
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div className="fixed top-0 right-0 m-1 bg-custom-bg bg-opacity-80 text-white p-2 rounded shadow-lg">
          {notification}
        </div>
      )}
    </NotificationContext.Provider>
  );
};
