import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext/AuthContext';
import { Line, Pie } from 'react-chartjs-2'; // Import Pie chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement, // Register ArcElement for Pie chart
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement // Register for Pie chart
);

interface AnalyticsData {
  monthlyUserGrowth: number[]; // Update for monthly data
  userDemographics: { male: number; female: number }; // Updated for demographics
}

const AnalyticsCharts: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    monthlyUserGrowth: [],
    userDemographics: { male: 0, female: 0 }, // Initialize male/female
  });

  const { token, baseUrl } = useAuth();

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/v1/admin/analytics-charts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAnalyticsData({
            monthlyUserGrowth: data.monthlyUserGrowth, // Assuming API returns monthly growth
            userDemographics: data.userDemographics, // Assuming API returns male/female ratio
          });
        } else {
          console.error('Failed to fetch analytics charts data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching analytics charts data', error);
      }
    };

    fetchAnalyticsData();
  }, [baseUrl, token]);

  // Line chart data for monthly growth (Jan to Dec)
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Months
    datasets: [
      {
        label: 'Monthly User Growth',
        data: analyticsData.monthlyUserGrowth,
        fill: true,
        borderColor: 'rgba(32,78,81,1)',
        backgroundColor: 'rgba(45,106,79,0.2)',
      },
    ],
  };

  const lineChartOptions = {
    scales: {
      y: {
        beginAtZero: true, // Ensure vertical axis starts at 0
        max: 250,          // Set max value to 250
        ticks: {
          stepSize: 50,    // Set interval to 50
        },
      },
    },
  };

  // Pie chart data for user demographics (Male/Female)
  const pieChartData = {
    labels: ['Male', 'Female'], // Gender labels
    datasets: [
      {
        data: [analyticsData.userDemographics.male, analyticsData.userDemographics.female], // Male/Female data
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'], // Colors for male/female
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 gap-10">
      {/* Line chart - takes full space */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Monthly User Growth</h3>
        <Line data={lineChartData} options={lineChartOptions} /> {/* Add options for scaling */}
      </div>

      {/* Pie chart */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">User Demographics</h3>
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default AnalyticsCharts;
