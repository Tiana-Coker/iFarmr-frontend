import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Sidebar from '../../components/dashboard/sidebar/sidebar';
import PopularPosts from '../../components/dashboard/popularPost/PopularPost';
import Dashboard1 from '../../components/dashboard/userdashboardComponent/UserDashboard1';
import Dashboard2 from '../../components/dashboard/userdashboardComponent/UserDashboard2';
import ErrorPage from '../../components/error/Error'; // Ensure correct import path
import { useAuth } from '../../AuthContext'; // Import the hook

const MainUserDashboard: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
  const { baseUrl, token } = useAuth(); // Use the auth context

  useEffect(() => {
    const validateToken = async () => {
      try {
        await axios.get(`${baseUrl}/api/v1/auth/validate-token`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        const axiosError = err as AxiosError;
        console.error('Error details:', axiosError.response?.data); // Log the error details

        if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
          setError(true);
        } else {
          console.error('Unexpected error:', axiosError); // Log unexpected errors
          setError(true); // Optionally handle other errors
        }
      }
    };

    validateToken();
  }, [baseUrl, token]);

  if (error) {
    return <ErrorPage />; // Render the custom error page if an error occurs
  }

  return (
    <div className="flex flex-col custom-md:flex-row h-screen">
      {/* Sidebar */}
      <div className="flex-none w-full custom-md:w-1/3 custom-lg:w-1/5 bg-gray-100 p-0 custom-md:p-0">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-grow w-full p-4 custom-md:p-6">
        <Dashboard1 />
        <Dashboard2 />
      </main>

      {/* Popular Posts */}
      <aside className="w-full custom-md:w-[calc(29.7%+10px)] bg-white  p-0 custom-md:p-6">
        <PopularPosts />
      </aside>
    </div>
  );
};

export default MainUserDashboard;
