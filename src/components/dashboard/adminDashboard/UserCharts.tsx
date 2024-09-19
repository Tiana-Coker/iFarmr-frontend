import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { ArrowUp, ArrowDown, Ellipsis } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  Filler,
} from "chart.js";
import { ChartOptions, TooltipItem } from "chart.js";

// Registering chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, Filler);

interface UserStats {
  dailyUserGrowth: number[];
  weeklyActiveUsers: number[];
  totalActiveUsers: number;
  activeUsersPercentageChange: number;
  drawBorder?: boolean;
}

const UserCharts: React.FC = () => {
  const [userStats, setUserStats] = useState<UserStats>({
    dailyUserGrowth: [],
    weeklyActiveUsers: [],
    totalActiveUsers: 0,
    activeUsersPercentageChange: 0,
  });

  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  const baseUrl = import.meta.env.VITE_API_BASE_URL; // Environment variable for the API base URL

  useEffect(() => {
    // Fetch data from your API
    const fetchUserStats = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/v1/admin/stats`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          const {
            dailyUserGrowth,
            weeklyActiveUsers,
            totalActiveUsers,
            activeUsersPercentageChange,
          } = data;
          setUserStats({
            dailyUserGrowth,
            weeklyActiveUsers,
            totalActiveUsers,
            activeUsersPercentageChange,
          });
        } else {
          console.error("Failed to fetch user stats. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user stats", error);
      }
    };

    fetchUserStats();
  }, [baseUrl, token]); // Dependencies

  // Line Chart Data for User Growth
  const lineChartData = {
    labels: [  "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    datasets: [
      {
        label: "Total Users",
        data: userStats.dailyUserGrowth ,
        fill: true,
        borderColor: "rgba(32,78,81,1)",
        backgroundColor: "rgba(45,106,79,0.2)",
        tension: 0.3,
        pointBackgroundColor: "#2d6a4f",
        
      },
    ],
  };

  // Bar Chart Data for Weekly Active Users
  const barChartData = {
    labels: [ "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    datasets: [
      {
        label: "Active Users",
        data: userStats.weeklyActiveUsers,
        backgroundColor: "rgba(32,78,81,1)",
        borderWidth: 1,
        barThickness: 12, // Control the thickness of bars
        borderRadius: 8,  // Rounded corners for bars
      },
    ],
  };
  

  // Unified options for both Line and Bar charts, with x-axis increment of 10 and dashed horizontal lines
  const unifiedOptions: ChartOptions<'line' | 'bar'> = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart height to be set explicitly
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'line' | 'bar'>) => `Total: ${tooltipItem.raw}`, // Tooltip for both charts
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove vertical grid lines
        },
        ticks: {
          color: 'rgba(139,139,167,1)',
          
        },
      },
      y: {
        grid: {
          color: 'rgba(0,0,0,0.06)',
        
        },
        ticks: {
           // drawBorder: false,
          color: 'rgba(139,139,167,1)',
          stepSize: 10,
          //border: 9,
         // borderDash: [8, 4]
        },
      },
    },
  };

  // Function to convert stats to CSV
  const exportToCSV = () => {
    const rows = [
      ["Day", "Total Users", "Active Users"], // Headers
      ...["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => [
        day,
        userStats.weeklyActiveUsers[index] || 0,
        userStats.dailyUserGrowth[index] || 0,
      ]),
    ];

    let csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user_stats_report.csv");
    document.body.appendChild(link); // Required for Firefox

    link.click(); // Trigger download
  };

  return (
    <div className="grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-20">
      {/* User Growth Chart */}
      <div className="bg-white rounded-lg pl-4 md:p-6" style={{ height: '285px' }}>
        <div className="flex justify-between items-center mb-6 ">
          <h3 className="text-lg font-semibold">User Growth</h3>
          <button className="text-sm text-gray-500" onClick={exportToCSV}>Report &gt;</button>
        </div>
        <Line data={lineChartData} options={unifiedOptions} />
      </div>

      {/* Weekly Active Users Chart */}
      <div className="bg-white rounded-lg p-4 md:p-6" style={{ height: '250px' }}>
        {/* Title Section */}
        <div className="mb-4 flex justify-between items-center text-gray-500">
          <h3 className="text-normal font-normal">Weekly Active Users</h3>
          <Ellipsis size={30} />
        </div>

        {/* Total Users and Percentage Change Section */}
        <div className="flex space-x-4 items-center mb-2">
          <span className="text-2xl font-bold">
            {userStats.totalActiveUsers?.toLocaleString() || "0"}
          </span>

          <span
            className={`text-xs flex items-center ${
              userStats.activeUsersPercentageChange > 0
                ? "text-[rgba(66,189,83,1)]"
                : "text-red-600"
            }`}
          >
            {userStats.activeUsersPercentageChange > 0
              ? <>{userStats.activeUsersPercentageChange}% <ArrowUp size={11} /></>
              : <>{userStats.activeUsersPercentageChange}% <ArrowDown size={11} /></>}
          </span>
        </div>

        {/* Bar Chart */}
        <Bar data={barChartData} options={unifiedOptions} />
      </div>
    </div>
  );
};

export default UserCharts;
