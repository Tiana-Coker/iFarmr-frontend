import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext/AuthContext';
import { Line, Pie } from 'react-chartjs-2';
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
  ArcElement,
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
  ArcElement
);

interface AnalyticsData {
  monthlyUserGrowth: number[];
  userDemographics: { Male: number; Female: number };
}

const AnalyticsCharts: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    monthlyUserGrowth: [],
    userDemographics: { Male: 0, Female: 0 },
  });

  const { token, baseUrl } = useAuth();

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/v1/admin/user-statistics`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAnalyticsData({
            monthlyUserGrowth: data.monthlyUserRegistration, // Use the correct key from your endpoint
            userDemographics: data.genderDistribution,
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
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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

  // Calculate max y value dynamically
  const maxYValue = Math.max(...analyticsData.monthlyUserGrowth, 0);

  const lineChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: maxYValue > 0 ? Math.ceil(maxYValue / 50) * 50 : 50, // Dynamically set max value
        ticks: {
          stepSize: maxYValue > 0 ? Math.ceil(maxYValue / 5) : 10, // Adjust step size dynamically
        },
      },
    },
  };

  // Pie chart data for user demographics (Male/Female)
  const pieChartData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [analyticsData.userDemographics.Male, analyticsData.userDemographics.Female],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 gap-10">
      {/* Line chart */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Monthly User Growth</h3>
        <Line data={lineChartData} options={lineChartOptions} />
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
