import React from "react";
import Sidebar from "../dashboard/sidebar/sidebar";
import LivestockTable from "./LivestockTable";
import LivestockDashboard from "./LivestockDashboard";
import UpcomingTask from './LivestockAside'; // Import the component
import { useAuth } from "../../context/authContext/AuthContext";
// import UpcomingTask from "../upcoming_task/UpcomingTask";

const LivestockManagement: React.FC = () => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');

  // Decode the token to get the username
  const decodeToken = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Failed to decode token', e);
      return null;
    }
  };

  const decodedToken = token ? decodeToken(token) : null;
  const username = decodedToken && decodedToken.sub ? decodedToken.sub : 'User';

    // Get user details from the AuthContext
    const { userDetails } = useAuth();

  return (
    <div className="flex flex-col custom-md:flex-row h-screen">
      {/* Sidebar */}
      <div className="lg:w-1/3 w-full">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-grow w-full p-4 custom-md:p-6">
        <LivestockDashboard username={userDetails?.fullName || 'User'} />
        <LivestockTable />
      </main>

      {/* Right-hand side <aside> */}
      <aside className="w-full custom-md:w-[calc(29.7%+10px)] bg-white p-0 custom-md:p-6">    
        <UpcomingTask taskType="LIVESTOCK"/>
      </aside>
    </div>
  );
};

export default LivestockManagement;
