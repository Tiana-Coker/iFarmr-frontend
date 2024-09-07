import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Sidebar from '../../components/dashboard/sidebar/sidebar';
import PopularPosts from '../../components/dashboard/popularPost/PopularPost';
import Dashboard1 from '../../components/dashboard/userdashboardComponent/UserDashboard1';
import Dashboard2 from '../../components/dashboard/userdashboardComponent/UserDashboard2';
import ErrorPage from '../../components/dashboard/error/Error'; // Ensure correct import path

const MainUserDashboard: React.FC = () => {
  const [error, setError] = useState<boolean>(false);

  const apiBaseUrl: string = 'http://localhost:8080' // Use environmental variable
  const token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInN1YiI6ImxvcmR2eTEiLCJpYXQiOjE3MjU3MDQyNzIsImV4cCI6MTcyNTc5MDY3Mn0.mKtxhScldtC4Y1iJNwvY-qSuzSjtGf-4F53icRBp6iA'; // Replace with your actual token
  useEffect(() => {
    const validateToken = async () => {
      try {
        await axios.get(`${apiBaseUrl}/api/v1/auth/validate-token`, {
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
  }, [apiBaseUrl, token]);

  if (error) {
    return <ErrorPage />; // Render the custom error page if an error occurs
  }

  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <Sidebar />
      </div>
      <main className="flex-grow p-6">
        <Dashboard1 />
        <Dashboard2 />
      </main>
      <aside className="w-80 p-6 bg-white shadow-md">
        <PopularPosts />
      </aside>
    </div>
  );
};

export default MainUserDashboard;
