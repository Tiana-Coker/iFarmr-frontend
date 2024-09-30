import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext/AuthContext';

interface AnalyticsStatsData {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
}

const AnalyticsStats: React.FC = () => {
  const [stats, setStats] = useState<AnalyticsStatsData>({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
  });

  const { token, baseUrl, adminName } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/v1/admin/analytics-data`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const { totalUsers, activeUsers, newUsers } = data;
          setStats({ totalUsers, activeUsers, newUsers });
        } else {
          console.error('Failed to fetch analytics stats. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching analytics stats', error);
      }
    };

    fetchStats();
  }, [baseUrl, token]);

  return (
    <div className="relative">
      <h1 className="text-l font-semibold text-gray-800 mb-6">
        Welcome, {adminName}
      </h1>
      <div className="w-full h-52 rounded-2xl mb-10 shadow-md p-4 bg-white">
        <h2 className="text-lg font-normal mb-1">Analytics Overview</h2>
        <div className="flex space-x-6">
          <p><strong>Total Users: </strong>{stats.totalUsers}</p>
          <p><strong>Active Users: </strong>{stats.activeUsers}</p>
          <p><strong>New Users (24h): </strong>{stats.newUsers}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsStats;
