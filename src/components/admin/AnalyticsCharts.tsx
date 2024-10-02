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

  // Calculate total users and percentages
  const totalUsers = analyticsData.userDemographics.Male + analyticsData.userDemographics.Female;
  const malePercentage = totalUsers > 0 ? ((analyticsData.userDemographics.Male / totalUsers) * 100).toFixed(2) : '0';
  const femalePercentage = totalUsers > 0 ? ((analyticsData.userDemographics.Female / totalUsers) * 100).toFixed(2) : '0';

  // Pie chart data for user demographics (Male/Female) with donut style
  const pieChartData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [analyticsData.userDemographics.Male, analyticsData.userDemographics.Female],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        hoverOffset: 4,
        cutout: '50%', // This makes the pie chart a donut
      },
    ],
  };

  // Chart options to make the donut smaller and align left
  const pieChartOptions = {
    maintainAspectRatio: false, // Disable aspect ratio to control size
    responsive: true,
    plugins: {
      legend: {
        display: false, // Disable default legend since we'll use a custom one
      },
    },
  };

  return (
    <div className="grid grid-cols-1 gap-10">
      {/* Line chart */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Average User Time</h3>
        <Line data={lineChartData} options={lineChartOptions} />
      </div>

      {/* Pie (Donut) chart */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">User Demographics</h3>
        <div className="flex flex-col items-center">
          {/* Donut chart aligned to the left */}
          <div className="self-start" style={{ width: '200px', height: '200px' }}>
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
          
          {/* Custom legend centered below the donut */}
          <div className="mt-4 text-center space-y-2">
            <div className="flex justify-center items-center space-x-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: 'rgba(75, 192, 192, 0.6)' }}
              ></span>
              <span>Male</span>
              <span className="ml-4">{malePercentage}%</span>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: 'rgba(255, 99, 132, 0.6)' }}
              ></span>
              <span>Female</span>
              <span className="ml-4">{femalePercentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
