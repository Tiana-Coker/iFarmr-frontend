import React, { useEffect, useState } from "react";
import farmer from '../../../assets/Admin/farmer.png';
import wave from '../../../assets/Admin/wave.png';
import { useAuth } from '../../../context/authContext/AuthContext';

interface FarmStats {
  totalFarmers: number;
  activeFarmers: number;
  newRegistration: number;
}

const FarmStats: React.FC = () => {
  const [stats, setStats] = useState<FarmStats>({
    totalFarmers: 0,
    activeFarmers: 0,
    newRegistration: 0,
  });

//   const token = localStorage.getItem("token"); // Retrieve the token from localStorage
//   const baseUrl = import.meta.env.VITE_API_BASE_URL; // Environment variable for the API base URL

  const { token, baseUrl, adminName } = useAuth();

  useEffect(() => {
    // Fetch data from your API
    const fetchStats = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/v1/admin/dashboard-data`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          const { totalFarmers, activeFarmers, newRegistration } = data;
          setStats({ totalFarmers, activeFarmers, newRegistration });
        } else {
          console.error("Failed to fetch farm stats. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching farm stats", error);
      }
    };

    fetchStats();
  }, [baseUrl, token]); // Dependencies

  

  return (
    <div className=" relative">
      <h1 className="text-l font-semibold font-raleway text-gray-800 mb-6 z-10 relative">
        Welcome Back, {adminName}
      </h1>
      <div className="relative w-full h-52 rounded-2xl mb-10 shadow-md">
        {/* Wave background image */}
        <img src={wave} alt="Wave Background" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />

        {/* Content on top of the wave */}
        <div className="relative z-10 flex justify-between items-center h-full p-4 md:p-8">
          {/* Left side text (responsive layout) */}
          <div className="font-raleway text-left absolute top-4 left-4 right-4 md:static md:w-auto md:text-left">
            <h2 className="text-lg md:text-2xl font-normal mb-1 text-[rgba(47,88,15,1)]">Your Farm at a Glance</h2>
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-9 mb-2 text-sm text-[rgba(0,86,62,1)]">
              <p className="text-sm md:text-base font-light">
                <strong>Total Users</strong>
                <p>
                <span>{stats.totalFarmers?.toLocaleString() || "0"} Users</span>
                </p>
              </p>
              <p className="text-sm md:text-base font-light">
                <strong>Active Users</strong>
                <p>
                <span>{stats.activeFarmers?.toLocaleString() || "0"} Active Users</span>
                </p>
              </p>
            </div>
            <p className="text-sm md:text-base font-light text-[rgba(0,86,62,1)]">
              <strong>New Registrations</strong>
              <p>
              <span>{stats.newRegistration?.toLocaleString() || "0"} New Users (Last 24 hours)</span>
              </p>
            </p>
          </div>

          {/* Farmer Image */}
          <div className="flex items-center">
            <img
              src={farmer}
              alt="Farmer"
              className="h-52 rounded-md absolute right-0 bottom-0 sm:relative sm:right-auto sm:bottom-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmStats;
