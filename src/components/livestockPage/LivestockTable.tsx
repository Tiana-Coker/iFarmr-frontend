// LivestockComponent.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface LivestockSummary {
  animalName: string;
  quantity: string;
  status: string;
  location: string;
  createdDate: string;
}

interface LivestockComponentProps {
  title?: string; // Optional prop for title
  apiUrl?: string; // Optional prop to use a custom API URL
}

const LivestockComponent: React.FC<LivestockComponentProps> = ({ title = 'Current Livestock', apiUrl }) => {
  const [livestockData, setLivestockData] = useState<LivestockSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    if (!baseUrl || !token) {
      setError('Configuration error: API base URL or token is not defined');
      return;
    }

    const fetchLivestockData = async () => {
      try {
        const url = apiUrl ? apiUrl : `${baseUrl}/api/v1/livestock/user-summary`; // Use custom URL if provided
        const response = await axios.get<{ livestockSummaryInfo: LivestockSummary[] }>(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setLivestockData(response.data.map((item) => item.livestockSummaryInfo));
      } catch (error) {
        setError('Failed to fetch data.');
      }
    };

    fetchLivestockData();
  }, [apiUrl, baseUrl]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return original string if invalid date
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`; // Format: YYYY/MM/DD
  };
  const capitalizeFirstLetter = (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  if (error) return <div className="text-red-600">{error}</div>;

  return (
     <div className="w-full p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded-lg border border-gray-200 border-collapse">
  <thead className="bg-gray-100">
    <tr>
      <th className="py-2 px-8 border border-gray-200 text-left">Animal Name</th>
      <th className="py-2 px-8 border border-gray-200 text-left">Quantity</th>
      <th className="py-2 px-8 border border-gray-200 text-left">Status</th>
      <th className="py-2 px-8 border border-gray-200 text-left hidden custom-md:table-cell">Location</th>
      <th className="py-2 px-8 border border-gray-200 text-left hidden custom-md:table-cell">Date Acquired</th>
      <th className="py-2 px-8 border border-gray-200"></th>
    </tr>
  </thead>
  <tbody>
    {livestockData.map((livestock, index) => (
      <tr key={index} className="hover:bg-gray-50">
        <td className="py-2 px-8 border border-gray-200">{capitalizeFirstLetter(livestock.animalName)}</td>
        <td className="py-2 px-8 border border-gray-200">{capitalizeFirstLetter(livestock.quantity)}</td>
        <td className="py-2 px-8 border border-gray-200">{capitalizeFirstLetter(livestock.status)}</td>
        <td className="py-2 px-8 border border-gray-200 hidden custom-md:table-cell">
          {capitalizeFirstLetter(livestock.location)}
        </td>
        <td className="py-2 px-8 border border-gray-200 hidden custom-md:table-cell">
          {formatDate(livestock.createdDate)}
        </td>
        <td className="py-2 px-8 border border-gray-200 text-right">
          {/* Placeholder for more actions */}
          <button className="text-blue-600">...</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default LivestockComponent;
