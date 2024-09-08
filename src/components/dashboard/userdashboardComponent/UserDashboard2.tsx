import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useAuth } from '../../../AuthContext'; 
import wheat from '../../../assets/dashboard/wheat.jpeg';
import Avatar from 'react-avatar';

interface Notification {
  title: string;
  description: string;
  date: string;
  timeAgo: string;
  userFullName: string;
  message: string;
}

interface ErrorResponse {
  message: string;
}

const GrowYourFarmAndNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { token, baseUrl } = useAuth(); 

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/notifications/recent-activities`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data);
      } catch (err) {
        const axiosError = err as AxiosError<ErrorResponse>;
        setError(axiosError.response?.data?.message || 'Failed to fetch notifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [baseUrl, token]);

  return (
    <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8 p-4 w-full">
      {/* Grow Your Farm Section */}
      <div className="bg-cover bg-center w-full md:w-1/2 h-48 p-6 rounded-lg shadow-md relative" style={{ backgroundImage: `url(${wheat})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
        <div className="relative z-10 text-custom-grow">
          <h2 className="text-2xl font-medium">Grow Your Farm</h2>
          <p className="text-sm mb-4">Quickly Add New Entries and Keep Your Farm Data Up to Date.</p>
          <div className="flex space-x-4">
            <button className="bg-transparent text-white py-0 px-1 rounded-lg font-thin border border-gray-300 hover:bg-white hover:text-black hover:shadow-md transition">
              Add New Crop
            </button>
            <button className="bg-transparent text-white py-2 px-4 rounded-lg font-thin border border-gray-300 hover:bg-white hover:text-black hover:shadow-md transition">
              Add New Livestock
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <aside className="w-full md:w-1/2">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">View All ➔</a>
          </div>
          {loading && <p>Loading notifications...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && notifications.length === 0 && <p>No notifications.</p>}
          <ul className="space-y-4">
            {notifications.map((notification, index) => (
              <li key={index} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Avatar name={notification.userFullName} size="30" round />
                  <div>
                    <p className="text-gray-800">{notification.title}</p>
                    <p className="text-sm text-gray-500">{notification.description}</p>
                    <p className="text-sm text-gray-500">{notification.date}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{notification.timeAgo}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default GrowYourFarmAndNotifications;
